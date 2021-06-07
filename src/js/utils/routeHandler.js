import routes from 'js/utils/routes';
import { Header } from 'js/components';
import { Home, Lines, NotFound } from 'js/pages';

const { HOME, LINES, LOGIN, SECTIONS, STATIONS } = routes;
const $root = document.querySelector('#root');

const routeHandler = () => {
  const $app = document.createElement('div');
  $app.className = 'd-flex justify-center mt-5 w-100';

  const $appInnerContainner = document.createElement('div');
  $appInnerContainner.className = 'w-100';

  const $mainContainer = document.createElement('main');
  $mainContainer.className = 'mt-10 d-flex justify-center';

  const routesMatchComponents = [
    { path: HOME, component: Home },
    { path: LINES, component: Lines },
  ];

  const pathMatchRoute = routesMatchComponents.find(({ path }) => path === window.location.pathname);

  $mainContainer.appendChild(pathMatchRoute ? pathMatchRoute.component() : NotFound());

  $appInnerContainner.appendChild(Header());
  $appInnerContainner.appendChild($mainContainer);

  $app.appendChild($appInnerContainner);

  $root.innerHTML = '';
  $root.appendChild($app);
};

export default routeHandler;
