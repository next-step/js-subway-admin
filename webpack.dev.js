// webpack.dev.js는 개발환경에 필요한 설정들의 코드만 존재합니다. merge 함수를 통해 공통사항인 common과 병합해줍니다.
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const config = {
  // 개발서버에 관한 설정입니다.
  devServer: {
    // 개발서버의 port를 설정해줍니다. 다중 작업시에 port가 겹칠시에 변경해줄 수 있습니다.
    port: 8080,
    // 개발서버가 시작될때 기본 브라우저로 애플리케이션을 새 탭에서 띄워줍니다.
    open: true,
    // 에러메세지를 console창에만 띄우는것이 아닌 애플레케이션의 view에 직접 보여지게 합니다. CRA의 기본환경에서 보던 에러메시지입니다.
    overlay: true,
    // 라우팅에 관한 설정입니다. true값을 두게 되면 없는 라우트로 접근했을때 index.html을 응답해주게끔 설정됩니다.
    // object의 프로퍼티들을 이용하여 어떤 라우트로 접근했을때 어떤 파일을 응답해줄지 결정해 줄수도 있습니다.
    historyApiFallback: true
  },
  mode: 'development'
};

module.exports = merge(common, config);
