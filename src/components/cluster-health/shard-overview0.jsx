import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap';

import classnames from 'classnames';
import styles from './shard-overview.less';

class ShardOverview extends Component {

  getMockProps() {
    return {
      numberOfShards: 3
    }
  }

  _handleRefresh() {
    // TODO
  }

  _getNumberOfShards(numberOfShards) {
    if (numberOfShards > 1) {
      return `${numberOfShards} Shards`;
    } else if (numberOfShards == 1) {
      return "1 Shard";
    } else {
      return "Unknown";
    }
  }

  _getShardBalancerStateClass() {
    return ""; //TODO
  }

  _getShardBalancerRunningClass() {
    return ""; //TODO
  }

  _getShardBalancerStateText() {
    return "" //TODO
  }

  _getShardBalancerRunningText() {
    return "" //TODO
  }

  _getShardBalancerWarningIcon() {
    return "" // TODO
  }

  render() {
    this.props = this.getMockProps();
    const shardTooltip = {"id": ""};
    const balancerRunningTooltip = {"id": ""};
    return (
    <div className={classnames(styles.cluster)}>
        <div className={classnames(styles['cluster-header'])}>
          <div className={classnames(styles['cluster-column'])}>
            <span>
             <button onClick={this._handleRefresh}>
               <i className="fa fa-repeat"> </i>
             </button>
            </span>
            <span className="topology-sharded-type-name">
              { " Sharded Cluster "}
            </span>
            <OverlayTrigger placement="bottom" overlay={shardTooltip}>
              <span className={classnames(styles['cluster-shard-number'])}>
                {this._getNumberOfShards(this.props.numberOfShards)}
              </span>
            </OverlayTrigger>
            <div>
               Hover over the shard charts/balancer status for more details.
            </div>
            <i className="info-sprinkle"></i>
          </div>
          <div className={classnames(styles['cluster-column'])}>
            <div className={classnames(styles['cluster-column-balancer-container'])}>
              <span> BALANCER: </span>
              <span className={classnames(styles['cluster-column-balancer-container']), this._getShardBalancerStateClass() }>
                {this._getShardBalancerStateText()}
              </span>
              <OverlayTrigger placement="bottom" overlay={balancerRunningTooltip}>
                <span
                  className={classnames(styles['cluster-column-balancer-container']), this._getShardBalancerRunningClass()}                  >
                  {this._getShardBalancerRunningText()}&nbsp;
                  {this._getShardBalancerWarningIcon()}
                </span>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShardOverview;
