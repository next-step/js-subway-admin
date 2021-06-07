import subwayEmoji from 'images/subway_emoji.png';

const Home = () => {
  const $home = document.createElement('div');
  $home.className = 'd-flex flex-col';

  const $container = document.createElement('div');
  $container.className = 'd-flex justify-center';

  const $subwayEmoji = document.createElement('img');
  $subwayEmoji.src = subwayEmoji;
  $subwayEmoji.width = 200;

  $container.appendChild($subwayEmoji);

  const $loginNotice = document.createElement('p');
  $loginNotice.className = 'mt-0 text-center';
  $loginNotice.innerHTML = '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.';

  $home.append($container, $loginNotice);

  return $home;
};

export default Home;
