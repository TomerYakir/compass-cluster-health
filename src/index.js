import ClusterHealthPlugin from './plugin';

import {ClusterHealthStore} from 'stores';
// import { QueryHistoryStore, RecentListStore, FavoriteListStore } from 'stores';
// import { RecentQuery, FavoriteQuery, RecentQueryCollection, FavoriteQueryCollection } from 'models';

// import QueryHistoryActions from 'actions';

/**
 * Activate all the components in the Query History package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/

const INSTANCE_TAB_ROLE = {
  component: ClusterHealthPlugin,
  name: 'CLUSTER HEALTH',
  order: 3
};


function activate(appRegistry) {
  // Register RecentQueryCollection
  appRegistry.registerRole('Instance.Tab', INSTANCE_TAB_ROLE);


  // Register Stores
  appRegistry.registerStore('ClusterHealth.Store', ClusterHealthStore);
  /*
  appRegistry.registerStore('QueryHistory.Store', QueryHistoryStore);
  appRegistry.registerStore('QueryHistory.RecentListStore', RecentListStore);
  appRegistry.registerStore('QueryHistory.FavoriteListStore', FavoriteListStore);

  // Register Components
  appRegistry.registerComponent('QueryHistory.Component', QueryHistoryPlugin);
  appRegistry.registerComponent('QueryHistory.ShowQueryHistoryButton', ToggleQueryHistoryButton);

  // Register Actions
  appRegistry.registerAction('QueryHistory.Actions', QueryHistoryActions);
  */
}

/**
 * Deactivate all the components in the Query History package.
 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
function deactivate(appRegistry) {
  appRegistry.deregisterRole('Instance.Tab', INSTANCE_TAB_ROLE)
  // De-register Stores
  appRegistry.deregisterStore('ClusterHealth.Store');
  /*
  appRegistry.deregisterStore('QueryHistory.Store');
  appRegistry.deregisterStore('QueryHistory.RecentListStore');
  appRegistry.deregisterStore('QueryHistory.FavoriteListStore');

  // De-register Components
  appRegistry.deregisterComponent('QueryHistory.Component');
  appRegistry.deregisterComponent('QueryHistory.ShowQueryHistoryButton');

  // De-register Actions
  appRegistry.deregisterAction('QueryHistory.Actions');
  */
}

export default ClusterHealthPlugin;
export {
  activate,
  deactivate
};
