import React, { Component } from 'react';
import ShardOverview from './shard-overview';
import ShardCollectionsList from './shard-collections-list';
import styles from './cluster-health.less';
import classnames from 'classnames';

class ClusterHealth extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classnames('container',styles.component)}>
        <ShardOverview {...this.props} />
        <ShardCollectionsList {...this.props} />
      </div>
    );
  }
}

export default ClusterHealth;
