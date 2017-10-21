import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './shard-collections-list.less';
import CollectionChunkDistribution from './collection-chunk-distribution';
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import './tooltip.css';

class ShardCollectionsList extends Component {
  constructor(props) {
    super(props);
  }


  getShardedCollectionsNumber() {
    const { numberOfShardedCollections } = this.props;
    if (numberOfShardedCollections > 1) {
      return `${numberOfShardedCollections} Sharded Collections`;
    } else if (numberOfShardedCollections == 1) {
      return "1 Sharded Collection";
    } else {
      return "Unknown";
    }
  }

  getChunksInfo(collection) {
    return collection.chunkDistribution.map(function(shard) {
      return (
        <tr key={shard["shard"]}>
            <td><strong>{shard["shard"]}</strong></td>
            <td>{shard["avgObjSize"]}</td>
           <td>{shard["count"]}</td>
          <td>{shard["estimatedDataPerChunk"]}</td>
          <td>{shard["estimatedDocPercent"]}</td>
          <td>{shard["estimatedDocsPerChunk"]}</td>
        </tr>
      );
    },this)
  }

  getCollectionTooltip(collection) {
    if (collection)
    {
      return (
        <Tooltip id="distTooltip" >
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Shard</th>
                  <th>Average Object Size</th>
                  <th>Chunk Count</th>
                  <th>Estimated Data per Chunk</th>
                  <th>Estimated Docs %</th>
                  <th>Estimated Docs per Chunk</th>
                </tr>
              </thead>
              <tbody>
                {this.getChunksInfo(collection)}
              </tbody>
            </table>
          </div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip id="distTooltip">
          <div>
                Loading...
          </div>
        </Tooltip>
      );
    }
  }

  getCollections() {
    return (
      this.props.collections.map((collection) => {
        return (
          <li
            key={collection.name}
            className={classnames('list-group-item', styles['collection'])}
            >
            <div className="col-md-12">
              <div className="col-md-5">

                <OverlayTrigger placement="right" overlay={this.getCollectionTooltip(collection)}>
                  <span>
                    {collection.name}
                  </span>
                </OverlayTrigger>
                <span><i className="fa fa-info badge-spacing"> </i></span>
                <div>
                  <code>{collection.shardKey}</code>
                </div>
              </div>
              <div className="col-md-7">
                <CollectionChunkDistribution chunkDistribution={collection.chunkDistribution} />
              </div>
            </div>

          </li>
        )
      }, this)
    )
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <span className="badge">
            { this.getShardedCollectionsNumber() }
          </span>
        </div>
        <small>Hover over the collection name for more sharding details.</small>
        <div className="row">
          <ul className="list-group">
            { this.getCollections() }
          </ul>
        </div>
      </div>
    )
  }
}

export default ShardCollectionsList;
