import { NavigateButton } from 'js/components';
import routes from 'js/utils/routes';

const Navigator = () => {
  const $navigator = document.createElement('nav');
  $navigator.className = 'd-flex justify-center flex-wrap';

  const { LINES, SECTIONS, STATIONS, LOGIN } = routes;

  $navigator.appendChild(NavigateButton({ href: STATIONS, children: '🚉 역 관리' }));
  $navigator.appendChild(NavigateButton({ href: LINES, children: '🛤️ 노선 관리' }));
  $navigator.appendChild(NavigateButton({ href: SECTIONS, children: '🔁 구간 관리' }));
  $navigator.appendChild(NavigateButton({ href: LOGIN, children: '👤 로그인' }));

  return $navigator;
};

export default Navigator;
