import React, { Component } from 'react';
import ShardOverview from './shard-overview';
import ShardCollectionsList from './shard-collections-list';

class ClusterHealth extends Component {

  getMockProps() {
    return {
      numberOfShards: 3,
      balancerState: "Enabled",
      balancerRunning: false,
      totalSize: 15,
      shards: {
        "Shard_0": {
          "size": 4.5
        },
        "Shard_1": {
          "size": 5.5
        },
        "Shard_2": {
          "size": 2.5
        }
      },
      numberOfShardedCollections: 2,
      collections: [
        {
          name: "Events",
          shardKey: "{userId: 1, type: 1, timestamp: 1}",
          chunkDistribution: [
              {
                shard: "Shard_0",
                chunks: 34,
                avgObjSize: 1022,
                capped: false,
                count: 1402033,
                estimatedDataPerChunk: 3023,
                estimatedDocPercent: 28,
                estimatedDocsPerChunk: 3320
              },
              {
                shard: "Shard_1",
                chunks: 28,
                avgObjSize: 1022,
                capped: false,
                count: 1402033,
                estimatedDataPerChunk: 3023,
                estimatedDocPercent: 28,
                estimatedDocsPerChunk: 3320
              },
              {
                shard: "Shard_2",
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
        {
          name: "Files",
          shardKey: "{region: 1, extension: 1}",
          chunkDistribution: [
              {
                shard: "Shard_0",
                chunks: 17,
                avgObjSize: 1022,
                capped: false,
                count: 1402033,
                estimatedDataPerChunk: 3023,
                estimatedDocPercent: 28,
                estimatedDocsPerChunk: 3320
              },
              {
                shard: "Shard_1",
                chunks: 18,
                avgObjSize: 1022,
                capped: false,
                count: 1402033,
                estimatedDataPerChunk: 3023,
                estimatedDocPercent: 28,
                estimatedDocsPerChunk: 3320
              },
              {
                shard: "Shard_2",
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
      ]
    }
  }

  constructor(props) {
    super(props);
    this.getMockProps = this.getMockProps.bind(this);
  }

  render() {
    this.props = this.getMockProps();
    return (
      <div className="container-fluid">
        <ShardOverview {...this.props} />
        <ShardCollectionsList {...this.props} />
      </div>
    )
  }
}

export default ClusterHealth;
