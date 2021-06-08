import routeHandler from 'js/utils/routeHandler';

const Link = ({ href, children, className = '' }) => {
  const $link = document.createElement('a');
  $link.href = href;
  $link.className = className;
  $link.append(children);

  // 만약 Link 컴포넌트가 DOM에서 사라질때 어떻게 remove할지 고민
  $link.addEventListener('click', e => {
    e.preventDefault();
    window.history.pushState(null, '', href);
    routeHandler();
  });
  return $link;
};

export default Link;
