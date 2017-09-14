import React, { Component } from 'react';
import * as azure from 'azure-storage';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Container extends Component {
  static async getBlobs(container) {
    const blobService = new azure.BlobService(
      'eulera998',
      'enMQNmP0QSkoMlfdVkXyt7/ONqLyFrdfk4PdnkzIQ4f7TddlIZ70XrynH92IeiEzrrn3FIoN+rkkaGh31mRFHQ==',
    );

    try {
      let continuationToken;
      let blobs = [];
      const fetchListSegment = token =>
        new Promise((resolve, reject) => {
          blobService.listBlobsSegmented(container, token, (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
        });
      do {
        const listBlobResult = await fetchListSegment(continuationToken);
        continuationToken = listBlobResult.continuationToken;
        blobs = [...blobs, ...listBlobResult.entries];
      } while (continuationToken);
      return blobs;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      blobs: [],
    };
  }

  componentDidMount() {
    Container.getBlobs(this.props.name).then((blobs) => {
      this.setState({
        blobs,
      });
    });
  }

  render() {
    const blobs = this.state.blobs
      .filter(blob => /\.(gif|jpg|jpeg|tiff|png)$/i.exec(blob.name))
      .map(blob => (
        <tr key={blob.name}>
          <td>{blob.name}</td>
          <td>{blob.contentLength}</td>
          <td>---</td>
          <td>
            <Link to={`/image/${this.props.name}/${blob.name}`}>View</Link>
          </td>
        </tr>
      ));

    return (
      <div className="Container">
        <h3>{this.props.name}</h3>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Size</th>
              <th>Detections</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>{blobs}</tbody>
        </table>
      </div>
    );
  }
}

Container.propTypes = {
  name: PropTypes.string.isRequired,
};

Container.defaultProps = {};

export default Container;
