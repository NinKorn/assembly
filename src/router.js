import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/file',
            name: 'file',
            component: () => import('./views/File.vue')
        },
        {
            path: '/canvas',
            name: 'canvas',
            component: () => import('./views/Canvas.vue')
        },
        {
            path: '/print',
            name: 'print',
            component: () => import('./views/Print.vue')
        }
    ]
})
