import React, { Component } from 'react';
import ShardOverview from './shard-overview';
import ShardCollectionsList from './shard-collections-list';

class ClusterHealth extends Component {
  render() {
    return (
      <div className="container-fluid">
        <ShardOverview />
        <ShardCollectionsList />
      </div>
    )
  }
}

export default ClusterHealth;
