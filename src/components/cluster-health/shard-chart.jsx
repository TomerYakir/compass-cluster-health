import React, { PureComponent } from 'react';
import VegaLite from 'react-vega-lite';
import classnames from 'classnames';
import styles from './shard-overview.less';

class ShardChart extends PureComponent {
  constructor(props) {
    super(props);
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
           field: "type",
           type: "ordinal",
           scale: {"range": ["#C0C0C0", "#43b1e5"]},
           legend: {
             values: [],
             title: ''
           }
         },
         "tooltip": {
            "field": "size",
            "type": "quantitative"}
        }
    };
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
      <li className={classnames(styles['list-group-item'], styles['shard-container'])}>
        <div>
          <div className={classnames('col-md-4')}>
            <span className={classnames(styles['shard-name'])}>
              {this.props.name}
            </span>
            <span className={classnames(styles['shard-size'])}>
              {this.props.size} GB
            </span>
          </div>
          <div className="col-md-8">
            <VegaLite className="shard-chart" data={data} spec={barSpec} width={100} height={42} />
          </div>
        </div>
      </li>
    );
  }
}

export default ShardChart;
