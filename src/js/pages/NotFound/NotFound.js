const NotFound = () => {
  const $notFound = document.createElement('div');

  $notFound.textContent = '요청하신 페이지를 찾을 수 없습니다 :(';

  return $notFound;
};

export default NotFound;
