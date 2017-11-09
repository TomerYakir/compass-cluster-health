import React, { Component } from 'react';
import VegaLite from 'react-vega-lite';
import PropTypes from 'prop-types';

class ChunkMigrationChart extends Component {
  static propTypes = {
    numberOfShards: PropTypes.number,
    chunkDistribution: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  getBarSpec() {
    return {
  "width": 800,
  "height": 300,
  "mark": "area",
  "encoding": {
    "x": {
      "timeUnit": "hoursminutesseconds",
      "field": "time",
      "type": "temporal",
      "axis": {
        "format": "%H:%M"
      }
    },
    "y": {
      "field": "rate",
      "type": "quantitative"
    },
    }
  }
}

  render() {
    const barSpec = this.getBarSpec();
    const data = {
      values: this.props.chunkMigrationRate
    };
    return (
      <div>
        <VegaLite data={data} spec={barSpec} />
      </div>
    );
  }
}

export default ChunkMigrationChart;
