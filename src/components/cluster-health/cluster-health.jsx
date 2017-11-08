import React, { Component } from 'react';
import ShardOverview from './shard-overview';
import ShardCollectionsList from './shard-collections-list';
import ClusterChunkMigrationRate from './chunk-migration-rate';


class ClusterHealth extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <ShardOverview {...this.props} />
        <ShardCollectionsList {...this.props} />
        <ClusterChunkMigrationRate {...this.props} />
      </div>
    );
  }
}

export default ClusterHealth;
