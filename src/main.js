// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import Showrooms from './components/Showrooms'
import Dealers from './components/Dealers'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/showrooms', component: Showrooms},
    {path: '/dealers', component: Dealers}
  ]
})

/* eslint-disable no-new */
// const app = new Vue({
//  el: '#app',
//  template: '<App/>',
//  components: { App }
// })

// Vue App
new Vue({
  router,
  template: `
  <div id="app">
  <router-link to="/dealers">dealers</router-link>
  <router-link to="/showrooms">showrooms</router-link>
  <router-view></router-view>
  </div>
  `
//  render: h => h(App)
}).$mount('#app')

