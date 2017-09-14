import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Image from './Image';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('Image renders without crashing', async () => {
  try {
    const div = document.createElement('div');
    ReactDOM.render(<Image url="https://www.fillmurray.com/200/300" />, div);
  } catch (err) {
    expect(err).toBeTruthy();
  }
});

test('Image renders with rectangles without crashing', () => {
  const div = document.createElement('div');
  const generateRandomLabel = () => ({
    x: Math.ceil(Math.random() * 1000),
    y: Math.ceil(Math.random() * 1000),
    width: Math.ceil(Math.random() * 1000),
    height: Math.ceil(Math.random() * 1000),
  });
  const labels = Array(10)
    .fill(0)
    .map(() => Image.generateRandomLabel('https://www.fillmurray.com/200/300'));
  ReactDOM.render(<Image url="https://www.fillmurray.com/200/300" labels={labels} />, div);
});
