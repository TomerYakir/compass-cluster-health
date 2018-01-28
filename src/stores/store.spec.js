import expect from 'chai';
import store from 'stores';
import AppRegistry from 'hadron-app-registry';
import Connection from 'mongodb-connection-model';
import DataService from 'mongodb-data-service';

const CONNECTION = new Connection({
  hostname: '127.0.0.1',
  port: 27047,
  ns: 'compass-cluster-health-test'
});


describe('ClusterHealthStore [Store]', () => {
  const dataService = new DataService(CONNECTION);
  const appRegistry = new AppRegistry();
  
  before((done) => {
    appRegistry.registerStore('ClusterHealth.Store', store);
    store.onActivated(appRegistry);
    dataService.connect(() => {
      appRegistry.emit('data-service-connected', null, dataService);
      done();
    });
  });
  
  after(() => {
    dataService.disconnect();
  });
  
  describe('mockup', () => {
    beforeEach(() => {
      store.mockup = true;
      store.setState(store.getInitialState());
    });
  
    it('runs a test', () => {
      console.log(store.state);
    })
  });
  
  describe('with dataservice', () => {
    before(() => {
      store.mockup = false;
    });
    it('triggers correctly for balancer enabled', (done) => {
      const unsubscribe = store.listen(() => {
        unsubscribe();
        console.log(store.state);
        done();
      });
      store.loadData();
    });
  });
});
