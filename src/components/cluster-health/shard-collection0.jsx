import React from 'react';
import { CollectionChunkDistribution } from 'components/shard-collections-list/collection-chunk-distribution';
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
var ShardCollection =   React.createClass({

  _getChunksInfo: function() {
      return this.props.chunkDistribution.map(function(shard) {
        return (
          <tr>
              <td><strong>{shard["shard"]}</strong></td>
              <td>{shard["avgObjSize"]}</td>
             <td>{shard["capped"].toString()}</td>
             <td>{shard["count"]}</td>
            <td>{shard["estimatedDataPerChunk"]}</td>
            <td>{shard["estimatedDocPercent"]}</td>
            <td>{shard["estimatedDocsPerChunk"]}</td>
          </tr>
        );
      },this)
  },

  render() {

    let distTooltip = null;
    if (this.props.chunkDistribution)
    {
      distTooltip = (
        <Tooltip id="distTooltip" width={300}>
        <div>
          <table>
            <tr>
              <th>{"| Shard"}</th>
              <th>{"|| avgObjSize |"}</th>
              <th>{"| capped |"}</th>
              <th>{"| count |"}</th>
              <th>{"| estimatedDataPerChunk |"}</th>
              <th>{"| estimatedDocPercent |"}</th>
              <th>{"| estimatedDocsPerChunk |"}</th>
            </tr>
              {this._getChunksInfo()}
            </table>
        </div>
        </Tooltip>
      );
    } else {
      distTooltip = (
        <Tooltip id="distTooltip">
          <div>
            <table>
              <tr>
                Loading...
              </tr>
            </table>
          </div>
        </Tooltip>
      );
    }
    return (
        <div className="schema-field">
          <div className="row">
            <div className="col-sm-5">
              <OverlayTrigger placement="bottom" overlay={distTooltip}>
                <div className="schema-field-name">
                  <span className="collection-view-collection-name">{this.props.name}</span>
                  <span></span>
                </div>
              </OverlayTrigger>
              <div className="schema-field-type-list">
                Shard Key: <code>{this.props.shardKey}</code>
              </div>
            </div>
            <div className="col-sm-6">
                <CollectionChunkDistribution chunkDistribution={this.props.chunkDistribution} />
            </div>
          </div>
        </div>
    );
  }
});

ShardCollection.displayName = 'ShardCollection';

export default  ShardCollection;
export { ShardCollection };
