import Reflux from 'reflux';
// import Actions from 'actions';
import StateMixin from 'reflux-state-mixin';

const ClusterHealthStore = Reflux.createStore({
  mixins: [StateMixin.store],

  // listenables,

  getInitialState() {
    return {
      numberOfShards: 0
    };
  }

});

export default ClusterHealthStore;
export {ClusterHealthStore};
