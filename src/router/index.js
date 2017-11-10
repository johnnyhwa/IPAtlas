import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
}]

const router = new Router({
    //mode: 'history',
    //base: __dirname,
    routes
})

import store from '@/store/store'

/* router.beforeEach((to, from, next) => {
    let hasLogin = window.sessionStorage.getItem('user');
    if (to.matched[0].path != '/login' && !hasLogin) {
        next('/login')
    } else {
        next()
    }

}) */

export default router