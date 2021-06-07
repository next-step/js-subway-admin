import 'normalize.css';
import 'css/index.css';
import routeHandler from './utils/routeHandler';

window.addEventListener('DOMContentLoaded', routeHandler);
window.addEventListener('popstate', routeHandler);
