import React, { PureComponent } from 'react';
import VegaLite from 'react-vega-lite';
import classnames from 'classnames';
import styles from './shard-overview.less';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './tooltip.css';

class ShardChart extends PureComponent {
  static propTypes = {
    hosts: PropTypes.string,
    totalSize: PropTypes.number,
    size: PropTypes.number,
    name: PropTypes.string,
    isMemberDown: PropTypes.boolean,
    hasPrimary: PropTypes.boolean
  };

  constructor(props) {
    super(props);
  }

  getShardTooltip() {
    return (
      <Tooltip id="shardTooltip" placement="bottom">
        <div className="align-left">
          Hosts: {this.props.hosts}
        </div>
      </Tooltip>
    );
  }

  getBarSpec() {
    return {
      mark: 'bar',
      config: {
        axis: {
          titleColor: '#aaa',
          titleFontWeight: 'normal',
          titleFontSize: 10
        }
      },
      encoding: {
        y: {field: 'category',
          type: 'ordinal',
          axis: {
            grid: false,
            title: '',
            labels: false,
            ticks: 0,
            tickSize: 0,
            axisWidth: 0
          }
        },
        x: {
          aggregate: 'sum',
          field: 'size',
          type: 'quantitative',
          axis: {
            grid: false,
            ticks: 0,
            title: 'data size/total cluster size',
            labels: false,
            axisWidth: 0
          }
        },
        color: {
          field: 'type',
          type: 'ordinal',
          scale: {'range': ['#C0C0C0', '#43b1e5']},
          legend: {
            values: [],
            title: ''
          }
        },
        'tooltip': {
          'field': 'size',
          'type': 'quantitative'}
      }
    };
  }

  getHealthTooltip(status) {
      if (status === "warning")
      {
        return (
          <Tooltip id="healthTooltip">
            <div className="align-center">
              Warning! A primary is available but one or more secondaries are down.
            </div>
          </Tooltip>
        );
      }
      else if (status === "down")
      {
        return (
          <Tooltip id="healthTooltip">
            <div className="align-center">
              Alert! A primary is<strong> not </strong>available but one or more secondaries are down.
            </div>
          </Tooltip>
        );
      }
      else
      {
        return (
          <Tooltip id="healthTooltip">
            <div className="align-center">
              The shard is in healthy state.
            </div>
          </Tooltip>
        );
      }
  }

 getShardHealthIcon()
 {
   if (!this.props.hasPrimary)
   {
     return (
      <OverlayTrigger placement="bottom" overlay={this.getHealthTooltip("down")}>
        <div className={classnames(styles['radial-div-down'])}></div>
       </OverlayTrigger>
     );
   }
   if (this.props.isMemberDown)
   {
     return (
    <OverlayTrigger placement="bottom" overlay={this.getHealthTooltip("warning")}>
       <div className={classnames(styles['radial-div-warning'])} overlay={this.getHealthTooltip("warning")}></div>
    </OverlayTrigger>
  );
   }
   else {
     return (
    <OverlayTrigger placement="bottom" overlay={this.getHealthTooltip("healthy")}>
        <div className={classnames(styles['radial-div-healthy'])} ></div>
    </OverlayTrigger>
    );
   }
 }

  render() {
    const distance = this.props.totalSize - this.props.size;
    const data = {
      values: [
        {'category': 'dummy', 'type': 'shardSize', 'size': this.props.size},
        {'category': 'dummy', 'type': 'distanceFromAvg', 'size': distance}
      ]
    };
    const barSpec = this.getBarSpec();
    return (
      <li className={classnames(styles['list-group-item-cstm'], styles['shard-container'])}>
        <div >
          <div className={classnames('col-md-6',styles['shard-info'])}>
             {this.getShardHealthIcon()}
            <span className={classnames(styles['shard-name'])}>
              {this.props.name}
              <OverlayTrigger placement="bottom" overlay={this.getShardTooltip()}>
                <i className="fa fa-info help-icon" />
              </OverlayTrigger>
            </span>


          </div>
          <div className={classnames('col-md-6')}>
            <VegaLite className={classnames(styles['shard-chart'],styles['shard-chart-info'])}  data={data} spec={barSpec} width={100} height={42} />
            <span className={classnames(styles['shard-size'])}>
                {this.props.size} GB
            </span>
          </div>
        </div>
      </li>
    );
  }
}

export default ShardChart;
