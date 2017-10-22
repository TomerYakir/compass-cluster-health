import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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
          const shardObj = this.props.shards[shard];
          return (
            <ShardChart
              key={shard}
              name={shard}
              size={shardObj.size}
              numberOfShards={this.props.numberOfShards}
              hosts={shardObj.hosts}
              totalSize={this.props.totalSize} />
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
    return this.props.balancerEnabled ? "cluster-balancer-enabled" : "cluster-balancer-disabled";
  }

  _getShardBalancerRunningClass() {
    return this.props.balancerRunning ? "cluster-balancer-enabled" : "cluster-balancer-notrunning";
  }

  getBalancerTooltip() {
    if (this.props.balancerLockedWhen) {
      return (
        <Tooltip id="balancerRunningTooltip">
          <div className="align-left">
            <strong>Locked By:</strong> {this.props.balancerLockedBy}<br></br>
            <strong>Locked At:</strong> {this.props.balancerLockedWhen}<br></br>
            <strong>Reason for locking:</strong> {this.props.balancerLockedWhy}<br></br>
            <strong>Latest balancer errors:</strong><br></br>
            {this._getBalancerErrors()}
          </div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip id="balancerRunningTooltip">
          <div>
            Balancer not running
          </div>
        </Tooltip>
      )
    }
  }

  _getBalancerErrors() {
    if (this.props.balancerErrors) {
      return this.props.balancerErrors.map(function(balancerError) {
        return (
          <div key={balancerError.time}>
          {balancerError.time + " " + balancerError.details.errmsg}
          </div>
        );
      })
    }
  };

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
          <OverlayTrigger placement="bottom" overlay={this.getBalancerTooltip()}>
            <div className="col-md-4">
              <span>
                Balancer:
              </span>
              <span className={classnames('badge', styles['badge-spacing'],
                               styles['to-upper'], styles[this._getShardBalancerStateClass()])}>
                {this.props.balancerEnabled ? "Enabled": "Disabled"}
              </span>
              <span className={classnames('badge',styles['badge-spacing'],
                               styles['to-upper'], styles[this._getShardBalancerRunningClass()])}>
                {this.props.balancerRunning ? "Running" : "Not Running"}
              </span>
            </div>
          </OverlayTrigger>
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
