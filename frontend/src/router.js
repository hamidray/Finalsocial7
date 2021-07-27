import Vue from 'vue'
import Router from 'vue-router'
import Home  from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Posts from './components/Pages/Posts.vue'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes:  [
        {path: '/home' , component: Home},
        {path: '/posts' , component: Posts},
        {path: '/login' , component: Login},
        {path: '/register' , component: Register}
       
    ]
})
export default router