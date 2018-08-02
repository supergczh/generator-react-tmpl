# generator-react-tmpl [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

react 项目脚手架

## 介绍
react-tmpl 基于 create-react-app， 可以快速初始化 react 项目基本目录，在  create-react-app 的基础上集成 redux、react-router-dom、react-config、ant.design，为了适和项目开发，对目录进行优化。

## 安装
#### Step.1 安装 Yeoman

    npm install -g yo
    
#### Step.2 安装 generator-react-tmpl

    npm install -g generator-react-tmpl
    
## 运行

#### 安装完成后运行以下命令，输入配置，生成新项目

    yo react-tmpl

提示成功后，按照命令行提示，启动项目，就可以在浏览器看到 demo，初始化的项目有简单的代码可供参考

## 集成

* react
* redux
* react-router-dom
* react-router-config
* react-script
* antd
* axios

## 初始化得到的目录结构

    .
    ├── public/
    │   ├── favicon.ico
    │   ├── index.heml
    │   └── manifest.json
    │
    ├── src/
    │   ├── actions/
    │   ├── app/
    │   ├── components/
    │   ├── constants/
    │   ├── container/
    │   ├── images/
    │   ├── reducers/
    │   ├── requests/
    │   ├── routes/
    │   ├── store/
    │   ├── utils/
    │   └── banBackSpace.js     // 
    │   └── index.js
    │   └── index.css
    │   └── registerServiceWorker.js
    │
    ├── .eslintrc.js
    ├── .gitignore
    ├── config-overrides.js
    ├── package.json
    ├── README.md
    └── yarn.lock
    
## 待优化项



[npm-image]: https://badge.fury.io/js/generator-react-tmpl.svg
[npm-url]: https://npmjs.org/package/generator-react-tmpl
[travis-image]: https://travis-ci.org/idujiawei/generator-react-tmpl.svg?branch=master
[travis-url]: https://travis-ci.org/idujiawei/generator-react-tmpl
[daviddm-image]: https://david-dm.org/idujiawei/generator-react-tmpl.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/idujiawei/generator-react-tmpl
[coveralls-image]: https://coveralls.io/repos/idujiawei/generator-react-tmpl/badge.svg
[coveralls-url]: https://coveralls.io/r/idujiawei/generator-react-tmpl
