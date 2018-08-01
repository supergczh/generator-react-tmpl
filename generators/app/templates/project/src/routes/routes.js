/*
 * @ 作者: Mr.D 
 * @ 创建时间: 2018-01-31 17:51:48 
 * @ 文件主题: 页面路由
 * 
 */

import App from '../app/app.js';
import Layout from '../container/layout';

import Home from '../container/home'; // 首页

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
                        path: '/home',
                        component: Home,
                        exact: true,
                    },
                ]
            }
        ]
    }
]
