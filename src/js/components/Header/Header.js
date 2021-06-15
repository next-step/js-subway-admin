import { Link, Heading, Navigator } from 'js/components';
import routes from 'js/utils/routes';

const Header = () => {
  const $header = document.createElement('header');
  $header.className = 'my-4';

  const { HOME } = routes;

  // appendChild는 마운트 된 결과를 반환하기 때문에 바로 return할 수 있습니다. 하지만 append를 사용한다면 불가능합니다.
  // 하지만 append는 한번에 여러개의 node를 마운트 할 수 있는 반면에 appendChild는 한번에 하나의 node만을 마운트 시킬 수 있습니다.
  $header.appendChild(
    Link({
      href: HOME,
      children: Heading({ level: 1, className: 'text-center font-bold', children: '🚇 지하철 노선도' }),
      className: 'text-black',
    })
  );

  $header.appendChild(Navigator());

  return $header;
};

export default Header;
