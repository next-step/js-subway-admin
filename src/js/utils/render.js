const { default: routeHandler } = require('./routeHandler');

const $root = document.querySelector('#root');

const render = async () => {
  $root.innerHTML = '';
  $root.appendChild(await routeHandler());
};

export default render;
