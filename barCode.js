/* eslint-disable no-magic-numbers */
const fs = require('fs');

const random = () => Math.floor(Math.random() * 2);

const whiteness = () => {
  const colorCode = random() === 0 ? 0 : 200;
  return [colorCode, colorCode, colorCode].join(',');
};

const colorPicker = () => 'rgb(' + whiteness() + ');';

const generateStyle = (styleContents) => ' style = "' + styleContents + '"';

const generateTag = (tag, contents, style = '') =>
  '<' + tag + style + '>' + contents + '</' + tag.split(' ')[0] + '>';

const bar = () => {
  const backgroundColor = 'background-color:' + colorPicker();
  const blockStyle = 'width: 5%; height: 100%;' + backgroundColor;

  return generateTag('div', '', generateStyle(blockStyle));
};

const allBars = (numberOfBlocks) => {
  let blocks = '';

  Array(numberOfBlocks).fill(1).forEach(() => {
    blocks += bar();
  });

  return blocks;
};

const barCodeContainer = (bars) => {
  const containerStyle = 'display: flex; width: 1000px; height: 100px;';
  return generateTag('div', bars, generateStyle(containerStyle));
};

const generatePage = (container) =>
  generateTag('html', generateTag('body', container));

const main = (numberOfBars) => {
  const bars = allBars(numberOfBars);
  const container = barCodeContainer(bars);
  const pageContents = generatePage(container);

  fs.writeFileSync('index.html', pageContents, 'utf8');
};

main(400);
