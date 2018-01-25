import store from 'stores';
import AppRegistry from 'hadron-app-registry';

describe('ClusterHealthStore [Store]', () => {
  describe('mockup', () => {
    beforeEach(() => {
      store.mockup = true;
      store.setState(store.getInitialState());
    });
  
    it('runs a test', () => {
      console.log(store.state);
    })
  });
  describe('sinon', () => {
    const appRegistry = new AppRegistry();
    store.onActivated(appRegistry);
  });
});
