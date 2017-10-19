import React, { Component } from 'react';
import { StoreConnector } from 'hadron-react-components';
import ClusterHealth from 'components/cluster-health';
import 'bootstrap/dist/css/bootstrap.css';
// import { QueryHistoryStore } from 'stores';
//import Actions from 'actions';

class Plugin extends Component {
  static displayName = 'ClusterHealthPlugin';

  /**
   * Connect the Plugin to the store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div>
        <ClusterHealth />
      </div>
    )
    /*
    return (
      <StoreConnector store={QueryHistoryStore}>
        <QueryHistory actions={Actions} {...this.props} />
      </StoreConnector>
    );
    */
  }
}

export default Plugin;
export { Plugin };
