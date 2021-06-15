// webpack.prod.js는 배포환경에 필요한 설정들의 코드만 존재합니다. merge 함수를 통해 공통사항인 common과 병합해줍니다.
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

const config = {
  plugins: [
    // css는 js와 변경시점이 다르므로 [contenthash]를 사용하여 js가 변경되었을땐 css의 hash값이 변하지 않게끔 contenthash를 사용해줍니다. (기본적으로 MiniCssExtractPlugin을 사용하면 js와 css는 chunk가 다릅니다.)
    new MiniCssExtractPlugin({ filename: '[contenthash].css' })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    // chunk파일들을 나누는 기준을 설정합니다.
    splitChunks: {
      cacheGroups: {
        commons: {
          // 이 애플리케이션의 개발자는 node_modules에 존재하는 라이브러리, 프레임워크의 코드들을 수정할 일이 없으니 venders라는 파일명으로 chunk파일을 분리하여 캐싱시켜줍니다.
          test: /[\\/]node_modules[\\/]/,
          name: 'venders',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    // 배포환경에서의 css파일 최적화에 대한 설정입니다.
    minimizer: [
      new TerserWebpackPlugin({
        // 다중 프로세스를 사용하여 병렬적인 작업을 할것인지에 대한 boolean 값을 넣어줍니다. 기본값은 true이며 number값으로 CPU 코어의 갯수를 명시적으로 작성해줄 수도 있습니다.
        parallel: true
        // 옵션이 많고 복잡하기 때문에 https://github.com/webpack-contrib/terser-webpack-plugin 사용시 공식문서를 참고해보면 될 것 같습니다.
      }),
      new CssMinimizerPlugin()
    ]
  },
  mode: 'production'
};

module.exports = merge(common, config);
