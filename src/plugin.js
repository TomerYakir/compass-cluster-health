import React, { Component } from 'react';
import { StoreConnector } from 'hadron-react-components';
import ClusterHealth from 'components/cluster-health';
import store from 'stores';
import Actions from 'actions';
// import 'bootstrap/dist/css/bootstrap.css';

class ClusterHealthPlugin extends Component {
  static displayName = 'ClusterHealthPlugin';

  /**
   * Connect the Plugin to the store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <StoreConnector store={store}>
        <ClusterHealth actions={Actions} {...this.props} />
      </StoreConnector>
    );
  }
}

export default ClusterHealthPlugin;
export { ClusterHealthPlugin };
