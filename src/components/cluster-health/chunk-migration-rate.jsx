import React, { Component } from 'react';

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
          <div className="col-md-3">span 2</div>
          <div className="col-md-3">
            <div className="dropdown">
    <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Tutorials
    <span className="caret"></span></button>
    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
      <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">HTML</a></li>
      <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">CSS</a></li>
      <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">JavaScript</a></li>
      <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">About Us</a></li>
    </ul>
  </div>
          </div>
          <div className="col-md-3"><span className="label label-default">{this.props.chunkMigrationRate.avgRate} GB/h</span></div>
        </div>
        <div className="row">
          <div className="col-md-12">represting the chart area</div>
        </div>
      </div>
    );
  }
}

export default ClusterChunkMigrationRate;
