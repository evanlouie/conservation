import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Image.css';

class Image extends Component {
  static async generateRandomLabel(url) {
    try {
      const imageResponse = await fetch(url);
      const imageBlob = await imageResponse.blob();
      const objectUrl = URL.createObjectURL(imageBlob);
      const image = document.createElement('img');
      image.src = objectUrl;
      return image;
    } catch (err) {
      throw err;
    }
  }

  static async downloadImage(url) {
    try {
      const imageResponse = await fetch(url);
      const imageBlob = await imageResponse.blob();
      const objectUrl = URL.createObjectURL(imageBlob);
      return objectUrl;
    } catch (err) {
      throw err;
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const image = document.createElement('img');
    image.onload = () => {
      // const canvasWidth = document.documentElement.clientWidth * 1; // 75vw
      const canvasWidth = 850;
      // const canvasWidth = this.canvas.parentElement.width;
      const scale = canvasWidth / image.width;
      // const canvasHeight = image.height * scale;
      const canvasHeight = image.height * scale;
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      const ctx = this.canvas.getContext('2d');

      // render image on convas and draw the square labels
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      ctx.strokeStyle = 'red';
      this.props.labels.forEach((label) => {
        ctx.strokeRect(label.x, label.y, label.width, label.height);
      });
    };
    image.src = this.props.url;
  }

  render() {
    return (
      <div className="Image">
        <canvas
          ref={(ref) => {
            this.canvas = ref;
          }}
        />
      </div>
    );
  }
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }),
  ),
};

Image.defaultProps = {
  labels: [],
};

export default Image;
