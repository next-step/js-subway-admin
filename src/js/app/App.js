import routes from 'js/utils/routes';
import { Header } from 'js/components';
import { Home, Lines, Login, Sections, NotFound, Stations } from 'js/pages';
import render from 'js/utils/render';
import ajax from 'js/api';

const { HOME, LINES, LOGIN, SECTIONS, STATIONS } = routes;

const App = (async () => {
  let stations = await ajax.getStations();
  const setStations = newStations => {
    stations = newStations;
    render();
  };
  return async () => {
    const $app = document.createElement('div');
    $app.className = 'd-flex justify-center mt-5 w-100';

    const $appInnerContainner = document.createElement('div');
    $appInnerContainner.className = 'w-100';

    const $mainContainer = document.createElement('main');
    $mainContainer.className = 'mt-10 d-flex justify-center';

    const routesMatchComponents = [
      { path: HOME, component: Home },
      { path: LINES, component: Lines },
      { path: LOGIN, component: Login },
      { path: SECTIONS, component: Sections },
      { path: STATIONS, component: await Stations },
    ];

    const pathMatchRoute = routesMatchComponents.find(({ path }) => path === window.location.pathname);

    $mainContainer.appendChild(
      pathMatchRoute ? pathMatchRoute.component({ stations, setStations }) : NotFound()
    );

    $appInnerContainner.appendChild(Header());
    $appInnerContainner.appendChild($mainContainer);

    $app.appendChild($appInnerContainner);

    return $app;
  };
})();

export default App;
