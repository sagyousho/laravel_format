const VueLoaderPlugin = require('vue-loader/lib/plugin');

//pathの読み込み
const path = require("path");
//パッケージのライセンス情報をjsファイルの中に含める
const TerserPlugin = require("terser-webpack-plugin");
//mini-css-extract-plugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// clean-webpack-plugin の読み込み
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// globuleの読み込み
const globule = require("globule");
// html-webpack-pluginの読み込み
const HtmlWebpackPlugin = require("html-webpack-plugin");
// copy-webpack-pluginの読み込み
const CopyPlugin = require("copy-webpack-plugin");
// imagemin-webpack-pluginの読み込み
const ImageminPlugin = require("imagemin-webpack-plugin").default;
// imagemin-mozjpegの読み込み
const ImageminMozjpeg = require("imagemin-mozjpeg");

// 本番環境のときはsoucemapを出力させない設定
const enabledSourceMap = process.env.NODE_ENV !== "production";

const app = {
  // 読み込み先（srcの中のjsフォルダのinit.jsを読み込む）
  entry: path.resolve(__dirname, "src/js/init.js"),
  //出力先（distの中のjsフォルダへinit.jsを出力）
  output: {
    filename: "./js/init.js",
    path: path.resolve(__dirname, "public/dist")
  },

  //仮想サーバーの設定
  devServer: {
    //ルートディレクトリの指定
    static: {
      directory: path.join(__dirname, "public/dist")
    },
    //ブラウザを自動的に起動
    open: true,
    // 監視するかフォルダはどれか
    watchFiles: ["src/**/*"],
    //バンドルされたファイルを出力するかどうか。お好みで。
    //writeToDisk: true
  },
  //パッケージのライセンス情報をjsファイルの中に含める
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"]
          }
        }
      },
      {
        // 対象となるファイルの拡張子(scssかsassかcss)
        test: /\.(sa|sc|c)ss$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          {
            loader: MiniCssExtractPlugin.loader
          },
          // CSSをバンドルするためのローダー
          {
            loader: "css-loader",
            options: {
              // CSS内のurl()メソッドの取り込みを禁止
              url: false,
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
              // postcss-loader と sass-loader の場合は2を指定
              importLoaders: 2
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            }
          },
          // PostCSS（autoprefixer）の設定
          {
            loader: "postcss-loader",
            options: {
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
              postcssOptions: {
                // ベンダープレフィックスを自動付与
                plugins: [require("autoprefixer")({ grid: true })]
              }
            }
          },
          // Sass を CSS へ変換するローダー
          {
            loader: "sass-loader",
            options: {
              // dart-sass を優先
              implementation: require("sass"),
              //  production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap
            }
          }
        ]
      },
      {
          test: /\.vue$/,
          loader: 'vue-loader',
      },
    ]
  },
  target: "web",
  
 //webpackの中に画像の圧縮処理など、重い処理を含めるとwarningが表示されます。それを回避する設定
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  //プラグインの設定
  plugins: [
    new VueLoaderPlugin(),
    
    new CleanWebpackPlugin({ // dist内の不要なファイルやフォルダを消す
    }),
    new MiniCssExtractPlugin({ // distの中にあるcssフォルダにstyle.cssを出力
      filename: "./css/style.css"
    }),
    new CopyPlugin({ //圧縮した画像をsrcのimagesフォルダからコピーして、distのimagesフォルダに出力する
      patterns: [
        {
          from: `${path.resolve(__dirname, "src")}/images/`,
          to: `${path.resolve(__dirname, "public/dist")}/images/`
        }
      ]
    }),
    new ImageminPlugin({ //画像圧縮処理の指定
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 89,
          progressive: true
        })
      ],
      pngquant: {
        quality: "80-89"
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256
      },
      svgo: {}
    })
  ],
  resolve: {
        extensions: ['.css', '.js', '.ts', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
  },
  
  //source-map タイプのソースマップを出力
  devtool: "source-map",
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/ //正規表現で指定
  }
};

//以下、src/templates内のhtmlを圧縮設定、laravelでは使用しない
// htmlファイルを見つけて配列化
// const templates = globule.find("./src/templates/**/*.html");

// //htmlファイルごとにループさせる
// templates.forEach((template) => {
//   const fileName = template.replace("./src/templates/", "");
//   app.plugins.push(
//     new HtmlWebpackPlugin({
//       filename: `${fileName}`,
//       template: template,
//       inject: false, //false, head, body, trueから選べる
//       minify: false //本番環境でも圧縮しない
//     })
//   );
// });
module.exports = app;