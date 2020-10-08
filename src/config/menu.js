import React from 'react';
import { Redirect } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';

//父级
// title:侧边栏显示的文字
// path: 模块规划的路径(实际不能访问)
// icon:图标(组件)
// children:子级的菜单项
//-----子级
// title: 显示的文字,
// bread: 面包屑显示的文字,
// icon:图标(组件)
// path: 组件的路径,
// layout: Layout组件,
// component: React.lazy(() => import('../Pages/组件的路径'))
// hide: true/false

const leftMenu = [{
    title: '用户模块',
    path: '/users',
    children: [
        {
            title: '角色管理',
            bread: ['用户模块', '角色管理'],
            path: '/users/roles',
            layout: Main,
            component: React.lazy(() => import('../Pages/Users/Roles'))
        }, {
            title: '用户管理',
            bread: ['用户模块', '用户列表'],
            path: '/users/list',
            layout: Main,
            component: React.lazy(() => import('../Pages/Users/List')),
        }, {
            hide: true,
            title: '编辑用户',
            bread: ['用户模块', '用户列表', '编辑用户'],
            path: '/users/list/edit/:id',
            layout: Main,
            component: React.lazy(() => import('../Pages/Users/List/Edit'))
        }
    ]
}];

//其它页面路由
const otherRouter = [
    {
        title: '首页',
        path: '/',
        component: () => <Redirect push to="/login" />
    },
    {
        title: '后台登陆',
        path: '/login',
        component: React.lazy(() => import('../Pages/Login'))
    },{
        title:'退出登陆',
        path:'/out_login',
        component:React.lazy(() => import('../Pages/OutLogin'))
    }
]

export { leftRouter, otherRouter };