/*
 * @作者: jiawei 
 * @创建时间: 2018-08-06 19:34:45 
 * @文件主题: 页面路由
 *
 */

import App from '../app/app.js';
import Layout from '../container/layout';

import Home from '../container/option'; // 首页

export default [
    {
        component: App,
        routes: [
            {
                path: '/',
                component: Layout,
                routes: [
                    {
                        path: '/',
                        component: Home,
                        exact: true,
                    },
                    {
                        path: '/option1/:page?',
                        component: Home,
                        exact: true,
                    }
                ]
            }
        ]
    }
]
