/*
 * @作者: jiawei 
 * @创建时间: 2018-08-06 19:16:11 
 * @文件主题: 配置antd按需加载 自定义主题
 *
 */

const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  //config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#00E89D",
      "@font-size-base": '12px',
      "@menu-item-color": '#333B4E',
      "@layout-header-background": "transparent",
      "@layout-sider-background": "#FFF"
    },
  })(config, env);
  return config;
};