import Vue from 'vue'
import VueRouter from 'vue-router'
import {Auth,onAuthStateChanged} from '../firebase'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      Login: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.auth)){
    onAuthStateChanged(Auth,user=>{
      if (user){
        next();
      }else{
        next({
          path:'/login'
        });
      }
    })
  }else{
    next();
  }
  if(to.matched.some(record => record.meta.Login)){
    onAuthStateChanged(Auth,user=>{
      if (user){
        next({
          path:'/dashboard'
        });
      }else{
        next();
      }
    })
  }else{
    next();
  }
});
export default router
