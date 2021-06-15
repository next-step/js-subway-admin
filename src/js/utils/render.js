import App from 'js/app/App';

const $root = document.querySelector('#root');

const render = async () => {
  $root.innerHTML = '';
  // App을 정상적으로 렌더링 시키려면 await로 즉시실행된 promise의 result값을 반환받으면 실제 저장되어 있는 함수가 반환되는데 이것 또한 promise이기 때문에 await를 한번 더 써주어야한다.
  $root.appendChild(await (await App)());
};

export default render;
