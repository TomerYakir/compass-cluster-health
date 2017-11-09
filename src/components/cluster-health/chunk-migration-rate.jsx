import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import ChunkMigrationChart from './chunk-migration-chart';

class ClusterChunkMigrationRate extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Chunk Migration Over Time</h1>
        <p>Change the zoom to view different time periods.</p>
        <p>Change the stack view for context.</p>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <DropdownButton title="time selection" id="dropdown-basic">
              <MenuItem eventKey="1">10 Minutes</MenuItem>
              <MenuItem eventKey="2">1 Hour</MenuItem>
              <MenuItem eventKey="3" active>1 Day</MenuItem>
            </DropdownButton>
          </div>
          <div className="col-md-3">
            <DropdownButton title="Stack options" id="dropdown-basic">
              <MenuItem eventKey="1" active>No stacking</MenuItem>
              <MenuItem eventKey="2">Source Shard</MenuItem>
              <MenuItem eventKey="3" >Destination Shard</MenuItem>
              <MenuItem eventKey="4" >Shard Pairs</MenuItem>
            </DropdownButton>
          </div>
          <div className="col-md-3"><span className="label label-default">{this.props.chunkMigrationRate.avgRate} GB/h</span></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ChunkMigrationChart
              chunkMigrationRate={this.props.chunkMigrationRate.rateOverTime}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default ClusterChunkMigrationRate;
