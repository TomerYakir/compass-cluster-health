import React, { PureComponent } from 'react';
import VegaLite from 'react-vega-lite';


//styles
//import classnames from 'classnames';
//import styles from './shard-overview.less';

class ShardChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  getBarSpec() {
    return {
      mark: 'bar',
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
      <div className="cluster-column">
        <div className="shard-container">
          <div className="shard-information">
            <span className="shard-name">
              {this.props.name}
            </span>
            <span className="shard-size">
              {this.props.size} GB
            </span>
          </div>
        </div>
        <VegaLite className="shard-chart" data={data} spec={barSpec} width={190} height={42} />
      </div>
    );
  }
}

export default ShardChart;
