import React, { Component } from 'react';
import VegaLite from 'react-vega-lite';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './shard-collections-list.less';

class CollectionChunkDistribution extends Component {
  static propTypes = {
    numberOfShards: PropTypes.number,
    chunkDistribution: PropTypes.array
  };

  constructor(props) {
    super(props);
    if (props.numberOfShards <= 10) {
      this.graphCo = 45;
    }
    else if (props.numberOfShards <= 20) {
      this.graphCo = 25;
    }
    else {
      this.graphCo = 10;
    }
  }

  getBarSpec() {
    return {
      mark: 'bar',
      width: this.props.numberOfShards * this.graphCo,
      height: 65,
      encoding: {
        x: {field: 'shard',
          type: 'ordinal',
          scale: {"bandSize": "fit"},
          axis: {
            grid: false,
            title: '',
            labelAngle: 0,
            tickSize: 0,
            tickLabelColor: '#a09f9e',
            axisColor: '#EBEBED'

          }
        },
        y: {
          field: 'chunks',
          type: 'quantitative',
          scale: {"bandSize": "fit"},
          axis: {
            grid: false,
            ticks: 2,
            title: 'Data %',
            titleColor: 'a09f9e',
            tickSize: 0,
            tickLabelColor: '#a09f9e',
            axisWidth: 0
          }
        },
        color: {
          field: 'type',
          type: 'ordinal',
          scale: {'range': ['#43b1e5', '#43b1e5', '#43b1e5']},
          legend: {
            values: [],
            title: ''
          },
          'tooltip': {
            'field': 'shard',
            'type': 'ordinal'}
        }
      }
    };
  }

  render() {
    const barSpec = this.getBarSpec();
    const data = {
      values: this.props.chunkDistribution
    };
    return (
      <div>
        <VegaLite className={classnames(styles['graph'])}data={data} spec={barSpec}  />
      </div>
    );
  }
}

export default CollectionChunkDistribution;
