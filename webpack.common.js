// common파일은 production, development에서 사용 될 공통적인 설정들의 코드만 존재합니다.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 다른 plugin과는 다르게 디스트럭처링 할당으로 불러와야합니다.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const styleLoader = {
  loader: 'style-loader',
  options: {
    // 여러개의 css, 또는 sass 파일을 불러올때 html파일에 여러개의 style태그가 생기는것이 아닌 하나의 style태그로 번들링해주는 옵션입니다.
    injectType: 'singletonStyleTag',
  },
};

// 비교적 최신 스타일 코드에 대한 크로스 브라우징을 위해 설정합니다.
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [['postcss-preset-env']],
    },
  },
};

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

module.exports = {
  // 절대 경로 설정를 설정합니다.
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  // 모듈들의 진입점 babel-polyfill은 애플리케이션에서 딱 한번만 실행되어야하기 때문에 entry에 추가해줍니다.
  entry: ['@babel/polyfill', './src/js/index.js'],
  // 모듈들을 번들링 한 번들 파일에 대한 설정
  output: {
    // 번들 파일의 이름 ([hash]를 넣어주게 되면 build시에 파일의 내용이 바뀌었을때 hash값을 바꿔주어 캐시때문에 일어나는 이슈를 해결해줍니다.)
    // [name]에 들어오는값은 entry파일의 이름 또는 webpack config파일에서 name프로퍼티값으로 지정한 값이 들어오게 됩니다.
    filename: '[name].[chunkhash].js',
    // 번들 파일을 만들 경로 __dirname은 이 변수를 쓴 파일의 절대경로를 반환해준다. 그리고 path.resolve함수를 통해 인자들 사이에 / 를 넣어 합쳐줍니다.
    path: path.resolve(__dirname, 'dist'),
  },
  // 사용 할 모듈들을 정의
  module: {
    rules: [
      {
        // 어떤 파일들이 loader의 대상이 될지 정규표현식을 통해 작성해줍니다.
        test: /\.css$/i,
        oneOf: [
          {
            // filename.module.css의 형식에 맞는 파일들만 해당 설정을 적용합니다.
            test: /\.module\.css$/i,
            // 사용하는 loader의 key 또는 객체 형식으로 loader key와 options를 설정해줄 수 있습니다.
            use: [
              !isProduction ? styleLoader : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  // css를 module처럼 사용하기 위해 클래스 선택자를 해시값으로 만들어주고 그것을 js파일에서 import해서 사용할 수 있다.
                  modules: true,
                },
              },
              postcssLoader,
            ],
          },
          {
            use: [!isProduction ? styleLoader : MiniCssExtractPlugin.loader, 'css-loader', postcssLoader],
          },
        ],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                return isProduction ? '[contenthash].[ext]' : '[path].[name].[ext]';
              },
              publicPath: 'assets/',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // template으로 지정한 파일로 build시 필요한 script나 link태그의 경로를 삽입하여 index.html파일을 생성해줍니다. 만약 번들파일이 hash값으로 나온다면 이것의 이름에 대해 신경 쓸 필요가 없습니다.
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: isProduction && {
        collapseWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
      },
    }),
    // 캐싱의 문제때문에 생길 수 있는 변수를 방지하거나, hash값으로 번들파일이 나올때 불 필요한 이전 파일은 삭제시켜줍니다.
    new CleanWebpackPlugin(),
    // webpack이 build시에 전역에서 참조할 수 있는 상수값을 생성해줍니다. 모든 모듈들이 이 값을 참조 할 수 있고 지금은 개발모드인지 배포모드인지 모든 webpack설정파일에서 참조하기 위해 사용했습니다.
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction,
    }),
  ],
};
