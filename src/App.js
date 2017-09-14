import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Image from './Image';
import * as azure from 'azure-storage';
import Container from './Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const STORAGE_ACCOUNT = 'eulera998';
function generateAzureBlobURL(storageAccount = STORAGE_ACCOUNT, containerName, filename) {
  const url = `https://${storageAccount}.blob.core.windows.net/${containerName}/${filename}`;
  return url;
}

const getContainers = async () => {
  const blobService = new azure.BlobService(
    'eulera998',
    'enMQNmP0QSkoMlfdVkXyt7/ONqLyFrdfk4PdnkzIQ4f7TddlIZ70XrynH92IeiEzrrn3FIoN+rkkaGh31mRFHQ==',
  );

  try {
    let continuationToken;
    let containers = [];
    const fetchListSegment = token =>
      new Promise((resolve, reject) => {
        blobService.listContainersSegmented(token, (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    do {
      const listContainerResult = await fetchListSegment(continuationToken);
      continuationToken = listContainerResult.continuationToken;
      containers = [...containers, ...listContainerResult.entries];
    } while (continuationToken);
    return containers;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const kittiwakes = [
  { label: 'kittiwake', box: [263, 298, 339, 357], score: '0.972' },
  { label: 'kittiwake', box: [330, 403, 382, 447], score: '0.968' },
  { label: 'kittiwake', box: [436, 125, 510, 164], score: '0.968' },
  { label: 'kittiwake', box: [520, 173, 569, 226], score: '0.965' },
  { label: 'kittiwake', box: [518, 498, 559, 539], score: '0.964' },
  { label: 'kittiwake', box: [199, 253, 268, 313], score: '0.963' },
  { label: 'kittiwake', box: [534, 235, 582, 274], score: '0.962' },
  { label: 'kittiwake', box: [128, 149, 190, 223], score: '0.957' },
  { label: 'kittiwake', box: [144, 278, 199, 362], score: '0.957' },
  { label: 'kittiwake', box: [333, 277, 392, 343], score: '0.955' },
  { label: 'kittiwake', box: [95, 322, 139, 410], score: '0.954' },
  { label: 'kittiwake', box: [252, 408, 308, 464], score: '0.953' },
  { label: 'kittiwake', box: [532, 182, 585, 226], score: '0.937' },
  { label: 'kittiwake', box: [685, 122, 730, 167], score: '0.928' },
  { label: 'kittiwake', box: [478, 427, 523, 480], score: '0.928' },
  { label: 'kittiwake', box: [581, 158, 620, 214], score: '0.926' },
  { label: 'kittiwake', box: [367, 463, 409, 515], score: '0.923' },
  { label: 'kittiwake', box: [326, 120, 383, 165], score: '0.922' },
  { label: 'kittiwake', box: [406, 407, 457, 440], score: '0.921' },
  { label: 'kittiwake', box: [493, 268, 547, 309], score: '0.920' },
  { label: 'kittiwake', box: [321, 394, 364, 447], score: '0.916' },
  { label: 'kittiwake', box: [527, 487, 568, 526], score: '0.914' },
  { label: 'kittiwake', box: [630, 201, 679, 243], score: '0.912' },
  { label: 'kittiwake', box: [547, 164, 598, 210], score: '0.908' },
  { label: 'kittiwake', box: [535, 168, 581, 212], score: '0.907' },
  { label: 'kittiwake', box: [640, 148, 686, 189], score: '0.906' },
  { label: 'kittiwake', box: [554, 308, 601, 356], score: '0.898' },
  { label: 'kittiwake', box: [293, 471, 336, 511], score: '0.897' },
  { label: 'kittiwake', box: [570, 368, 627, 407], score: '0.888' },
  { label: 'kittiwake', box: [655, 142, 704, 190], score: '0.877' },
  { label: 'kittiwake', box: [286, 141, 338, 191], score: '0.873' },
  { label: 'kittiwake', box: [650, 155, 693, 208], score: '0.858' },
  { label: 'kittiwake', box: [279, 466, 325, 512], score: '0.856' },
  { label: 'kittiwake', box: [589, 389, 639, 433], score: '0.845' },
  { label: 'kittiwake', box: [541, 484, 583, 532], score: '0.844' },
  { label: 'kittiwake', box: [430, 452, 472, 508], score: '0.834' },
  { label: 'kittiwake', box: [585, 434, 636, 470], score: '0.831' },
  { label: 'kittiwake', box: [580, 422, 632, 459], score: '0.831' },
  { label: 'kittiwake', box: [222, 112, 273, 167], score: '0.815' },
  { label: 'kittiwake', box: [215, 108, 255, 159], score: '0.798' },
  { label: 'kittiwake', box: [544, 476, 588, 515], score: '0.792' },
  { label: 'kittiwake', box: [569, 379, 613, 419], score: '0.792' },
  { label: 'kittiwake', box: [637, 184, 691, 222], score: '0.762' },
  { label: 'kittiwake', box: [277, 131, 332, 176], score: '0.724' },
  { label: 'kittiwake', box: [569, 440, 615, 476], score: '0.693' },
  { label: 'kittiwake', box: [424, 444, 465, 492], score: '0.692' },
  { label: 'kittiwake', box: [304, 128, 361, 174], score: '0.690' },
  { label: 'kittiwake', box: [173, 257, 239, 329], score: '0.687' },
  { label: 'kittiwake', box: [569, 150, 612, 189], score: '0.676' },
  { label: 'kittiwake', box: [549, 286, 594, 339], score: '0.662' },
  { label: 'kittiwake', box: [559, 488, 602, 536], score: '0.658' },
  { label: 'kittiwake', box: [568, 477, 610, 524], score: '0.652' },
  { label: 'kittiwake', box: [582, 452, 631, 486], score: '0.637' },
  { label: 'kittiwake', box: [670, 136, 717, 184], score: '0.629' },
  { label: 'kittiwake', box: [579, 399, 625, 438], score: '0.606' },
  { label: 'kittiwake', box: [206, 112, 244, 169], score: '0.604' },
  { label: 'kittiwake', box: [597, 414, 639, 455], score: '0.602' },
  { label: 'kittiwake', box: [567, 467, 617, 503], score: '0.545' },
  { label: 'kittiwake', box: [383, 418, 425, 462], score: '0.544' },
  { label: 'kittiwake', box: [390, 407, 438, 450], score: '0.544' },
];

const labels = kittiwakes.map((label) => {
  const x = label.box[0];
  const y = label.box[1];
  const width = label.box[2] - label.box[0];
  const height = label.box[3] - label.box[1];
  const text = label.label;
  const score = Number.parseFloat(label.score);
  return {
    x,
    y,
    width,
    height,
    text,
    score,
  };
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      blobs: [],
    };
  }

  componentDidMount() {
    getContainers().then((containers) => {
      this.setState({ containers });
    });
  }

  render() {
    const containers = this.state.containers.map(container => (
      <Container name={container.name} key={container.name} />
    ));

    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Birds Eye View</h2>
          </div>
          {containers}
          <Route
            path="/image/:container([^\/]+)/:filename(.+)"
            render={({ match }) => {
              const image = () => (
                <Image
                  url={generateAzureBlobURL(
                    STORAGE_ACCOUNT,
                    match.params.container,
                    match.params.filename,
                  )}
                />
              );
              return image();
            }}
          />
          <Image url="/kittiwake.jpg" labels={labels} />
        </div>
      </Router>
    );
  }
}

export default App;
