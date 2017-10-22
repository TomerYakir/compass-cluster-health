import Reflux from 'reflux';
import Actions from 'actions';
import StateMixin from 'reflux-state-mixin';
import Connection from 'mongodb-connection-model';
import DataService from 'mongodb-data-service';
import assert from 'assert';

const ClusterHealthStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,
  dataService: null,
  data: {},
  mockup: false,
  compass: false,
  databases: [],
  INIT_STATE: {
    numberOfShards: 0,
    balancerRunning: false,
    balancerEnabled: false,
    totalSize: 0,
    balancerLockedBy: '',
    balancerLockedWhen: '',
    balancerLockedWhy: '',
    balancerErrors: [],
    shards: {},
    numberOfShardedCollections: 0,
    collections: {}
  },

  init() {

  },

  refresh() {
    this.loadData();
  },

  getInitialState() {
    if (this.mockup) {
      // mockup
      return this.getMockProps();
    }
    this.loadData = this.loadData.bind(this);
    if (!this.compass) {
      if (!this.dataService) {
        this.dataService = new DataService(new Connection({
          hostname: '127.0.0.1',
          port: 27017,
          ns: 'test'
        }));
      }
      this.dataService.connect((err) => {assert.equal(null, err); this.loadData();});
    }
    return this.INIT_STATE;
  },

  onConnected: function(error, dataService) {
    if (error) {
      console.log('onConnected:error - ' + error)
    } else {
      this.dataService = dataService;
      this.loadData();
    }
  },

  deregisterFromCompass() {
    // TODO
  },

  returnPromise(func, arg) {
    return new Promise(func.bind(this, arg));
  },

  getBalancerEnabled(arg, resolve, reject) {
    const sort = [[ '_id', 1 ]];
    const filter = {_id: 'balancer'};
    const findOptions = {
      sort: sort,
      fields: null,
      skip: 0,
      limit: 1,
      promoteValues: false
    };

    this.dataService.find('config.settings', filter, findOptions, (error, documents) => {
      documents.length == 0 || (documents.length && !documents[0].stopped) ? this.data.balancerEnabled = true : this.data.balancerEnabled = false;
      resolve(true);
    });
  },

  getBalancerRunningByLocks(arg, resolve, reject) {
    const sort = [[ '_id', 1 ]];
    const findOptions = {
      sort: sort,
      fields: null,
      skip: 0,
      limit: 1,
      promoteValues: false
    };
    const filter = {_id: 'balancer', state: 2};
    this.dataService.find('config.locks', filter, findOptions, (error, documents) => {
      documents.length > 0 ? this.data.balancerRunning = true : this.data.balancerRunning = false;
      if (documents.length > 0) {
        this.data.balancerLockedBy = documents[0]['who'];
        this.data.balancerLockedWhen = documents[0]['when']; //.toISODate();
        this.data.balancerLockedWhy = documents[0]['why'];
      }
      resolve(true);
    });
  },

  getBalancerRunningByAdminCmd(arg, resolve, reject) {
    this.dataService.command('admin',{balancerStatus : 1},(error, results) => {
      results && !results.inBalancerRound ? this.data.balancerRunning = false : console.log('<3.4 version or balancer running');
      resolve(true);
    })
  },

  loadBalancerStats(arg, resolve, reject) {
    Promise.all([
      this.returnPromise(this.getBalancerEnabled),
      this.returnPromise(this.getBalancerRunningByLocks),
      this.returnPromise(this.getBalancerRunningByAdminCmd)
    ]).then(() => {
      resolve(true);
    })
  },

  getShardNamesHosts(arg, resolve, reject) {
    const collection = 'config.shards';
    const filter = {};
    const sort = [[ '_id', 1 ]];
    const limit = 0;
    const project = {};

    const findOptions = {
      sort: this.sort,
      fields: this.project,
      skip: this.skip,
      limit: this.limit,
      promoteValues: false
    };
    this.dataService.find(collection, filter, findOptions, (error, documents) => {
      this.data.shards = {}
      for (var shard in documents) {
        const shardObj = documents[shard];
        this.data.shards[shardObj['_id']] = {
          hosts: shardObj['host'],
          size: 0,
          databaseSizes: []
        }
      }
      this.data.totalSize = 0;
      resolve(true);
    });
  },

  getShardDatabaseSize(arg, resolve, reject) {
    const gbScale = 1024 * 1024 * 1024;
    this.dataService.command(arg,{dbStats : 1, scale: gbScale},(error, results) => {
      for (var shard in results['raw']) {
        const shardObj = results['raw'][shard];
        if (shard.indexOf('/') > 0) {
          shard = shard.split('/')[0];
        }
        this.data.shards[shard]['databaseSizes'].push(shardObj.dataSize + shardObj.indexSize);
      }
      resolve(true);
    });

  },

  getShardSizes(arg, resolve, reject) {
    const collection = 'config.databases';
    const filter = {};
    const limit = 0;
    const project = {};
    const findOptions = {
      sort: this.sort,
      fields: this.project,
      skip: this.skip,
      limit: this.limit,
      promoteValues: false
    };
    this.dataService.find(collection, filter, findOptions, (error, documents) => {
      let shardSizePromises = [];
      for (const doc in documents) {
        shardSizePromises.push(this.returnPromise(this.getShardDatabaseSize, documents[doc]['_id']))
        Promise.all(shardSizePromises).then(() => {
          resolve(true);
        }
      )
    }

  });
},

loadShardOverviewStats(arg, resolve, reject) {
  this.returnPromise(this.getShardNamesHosts).then(
    () => {
      this.returnPromise(this.getShardSizes).then(() => {
        let totalSize = 0;
        for (const shard in this.data.shards) {
          let shardSize = this.data.shards[shard].databaseSizes.reduce((accumulator, value) => {return accumulator + value});
          totalSize += shardSize;
          this.data.shards[shard].size = shardSize.toFixed(4);
        }
        this.data.totalSize = totalSize.toFixed(4);
        this.data.numberOfShards = Object.keys(this.data.shards).length
        resolve(true);
      })
    }
  )
},

getCollectionDistributionStats(arg, resolve, reject) {
  this.dataService.shardedCollectionDetail(arg['name'], (err, result) => {
    let shardDistribution = [];
    for (var shard in result['shards']) {
      const shardObj = result['shards'][shard];
      shardDistribution.push({
        shard: shard,
        chunks: shardObj['estimatedDataPercent'],
        avgObjSize: shardObj['avgObjSize'],
        count: shardObj['count'],
        estimatedDataPerChunk: shardObj['estimatedDataPerChunk'].toFixed(2),
        estimatedDocPercent: shardObj['estimatedDocPercent'],
        estimatedDocsPerChunk: shardObj['estimatedDocsPerChunk']
      });
    }
    this.data.collections[result['_id']]['chunkDistribution'] = shardDistribution;
    resolve(true);
  });
},

getCollectionStats(arg, resolve, reject) {
  const collection = 'config.collections';
  const filter = {};
  const sort = [[ '_id', 1 ]];
  const limit = 0;
  const project = {'lastmodEpoc' : 0, 'lastmod' : 0}
  const findOptions = {
    sort: sort,
    fields: project,
    limit: limit,
    promoteValues: false
  };
  this.dataService.find(collection, filter, findOptions, (error, documents) => {
    this.data.numberOfShardedCollections = documents.length;
    this.data.collections = {};
    let collDistPromises = [];
    for (const idx in documents) {
      const collection = documents[idx];
      const collObj = {
        'name': collection['_id'],
        'shardKey': JSON.stringify(collection['key']),
        'chunkDistribution': []
      }
      this.data.collections[collObj.name] = collObj;
      collDistPromises.push(this.returnPromise(this.getCollectionDistributionStats, collObj))
    }
    Promise.all(collDistPromises).then(() => {
      resolve(true);
    }
  )
});
},

loadCollectionStats(arg, resolve, reject) {
  this.returnPromise(this.getCollectionStats).then(() => {
    resolve(true);
  })
},

loadData() {
  if (this.compass && !this.dataService.isMongos()) {
    this.deregisterFromCompass();
  } else {
    console.log('loading data')
    Promise.all([
      this.returnPromise(this.loadBalancerStats),
      this.returnPromise(this.loadShardOverviewStats),
      this.returnPromise(this.loadCollectionStats)
    ]).then(() => {
      console.log('data loaded')
      this.setState(this.data)
    })
  }
},

getMockProps() {
  return {
    numberOfShards: 3,
    balancerEnabled: false,
    balancerRunning: false,
    totalSize: 15,
    balancerLockedBy: 'MDB_MS01',
    balancerLockedWhen: '2017-10-12 11:22:15Z',
    balancerLockedWhy: 'Doing balancing round',
    balancerErrors: [
      {
        time: '2017-10-12 11:10:15Z',
        details: {
          errmsg: 'Cannot stop balancer'
        }
      },
      {
        time: '2017-10-12 10:19:27Z',
        details: {
          errmsg: 'Chunk too big'
        }
      }
    ],
    shards: {
      'Shard_0': {
        'size': 4.5,
        'hosts': 'MDBS0_N1, MDBS0_N2, MDBS0_N3'
      },
      'Shard_1': {
        'size': 5.5,
        'hosts': 'MDBS1_N1, MDBS1_N2, MDBS1_N3'
      },
      'Shard_2': {
        'size': 2.5,
        'hosts': 'MDBS2_N1, MDBS2_N2, MDBS2_N3'
      }
    },
    numberOfShardedCollections: 2,
    collections: {
      'Events': {
        name: 'Events',
        shardKey: '{userId: 1, type: 1, timestamp: 1}',
        chunkDistribution: [
          {
            shard: 'Shard_0',
            chunks: 34,
            avgObjSize: 1022,
            capped: false,
            count: 1402033,
            estimatedDataPerChunk: 3023,
            estimatedDocPercent: 28,
            estimatedDocsPerChunk: 3320
          },
          {
            shard: 'Shard_1',
            chunks: 28,
            avgObjSize: 1022,
            capped: false,
            count: 1402033,
            estimatedDataPerChunk: 3023,
            estimatedDocPercent: 28,
            estimatedDocsPerChunk: 3320
          },
          {
            shard: 'Shard_2',
            chunks: 40,
            avgObjSize: 1022,
            capped: false,
            count: 1402033,
            estimatedDataPerChunk: 3023,
            estimatedDocPercent: 28,
            estimatedDocsPerChunk: 3320
          }
        ]
      },
      'Files': {
        name: 'Files',
        shardKey: '{region: 1, extension: 1}',
        chunkDistribution: [
          {
            shard: 'Shard_0',
            chunks: 17,
            avgObjSize: 1022,
            capped: false,
            count: 1402033,
            estimatedDataPerChunk: 3023,
            estimatedDocPercent: 28,
            estimatedDocsPerChunk: 3320
          },
          {
            shard: 'Shard_1',
            chunks: 18,
            avgObjSize: 1022,
            capped: false,
            count: 1402033,
            estimatedDataPerChunk: 3023,
            estimatedDocPercent: 28,
            estimatedDocsPerChunk: 3320
          },
          {
            shard: 'Shard_2',
            chunks: 48,
            avgObjSize: 1022,
            capped: false,
            count: 1402033,
            estimatedDataPerChunk: 3023,
            estimatedDocPercent: 28,
            estimatedDocsPerChunk: 3320
          }
        ]
      }
    }
  }
}

});

export default ClusterHealthStore;
export {ClusterHealthStore};
