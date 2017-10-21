import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import ShardChart from './shard-chart';

import classnames from 'classnames';
import styles from './shard-overview.less';

class ShardOverview extends Component {

  constructor(props) {
    super(props);
  }

  _handleRefresh() {
    // TODO
  }

  _getShardCharts() {
      if (this.props.shards) {
        return Object.keys(this.props.shards).map(function(shard) {
          return (
            <ShardChart
              key={shard}
              name={shard}
              size={this.props.shards[shard]["size"]}
              numberOfShards = {this.props.numberOfShards}
              totalSize = {this.props.totalSize} />
          )
        },this)
      } else {
        return null;
      }
    }

  _getNumberOfShards() {
    const { numberOfShards } = this.props;
    if (numberOfShards > 1) {
      return `${numberOfShards} Shards`;
    } else if (numberOfShards == 1) {
      return "1 Shard";
    } else {
      return "Unknown";
    }
  }

  _getShardBalancerStateClass() {
    return this.props.balancerState == "Enabled" ? "cluster-balancer-enabled" : "cluster-balancer-disabled";
  }

  _getShardBalancerRunningClass() {
    return this.props.balancerRunning ? "cluster-balancer-enabled" : "cluster-balancer-notrunning";
  }

  render() {
    const shardTooltip = {"id": ""};
    const balancerRunningTooltip = {"id": ""};
    return (
      <div className={classnames(styles.top)}>
        <div className="row">
          <div className="col-md-8">
            <span>
              <button onClick={this._handleRefresh}>
                <i className="fa fa-repeat"> </i>
              </button>
            </span>
            <span className={classnames(styles['badge-spacing'])}>
              {this._getNumberOfShards()}
            </span>
          </div>
          <div className="col-md-4">
            <span>
              Balancer:
            </span>
            <span className={classnames('badge', styles['badge-spacing'],
                             styles['to-upper'], styles[this._getShardBalancerStateClass()])}>
              {this.props.balancerState}
            </span>
            <span className={classnames('badge',styles['badge-spacing'],
                             styles['to-upper'], styles[this._getShardBalancerRunningClass()])}>
              {this.props.balancerRunning ? "Running" : "Not Running"}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <small>
              Hover over the shard charts/balancer status for more details.
            </small>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className={classnames(styles['list-group-horizontal'])}>
              {this._getShardCharts()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ShardOverview;
