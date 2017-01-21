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
  <main class="wrapper">
  <nav class="navigation">
  <section class="container">
  <ul class="navigation-list">
  <li class="navigation-item">
  <router-link class="navigation-link" to="/dealers">dealers</router-link>
  </li>
   <li class="navigation-item">
  <router-link class="navigation-link" to="/showrooms">showrooms</router-link>
  </li>
  </ul>
  </section>
  </nav>
  <section class="container">
  <router-view></router-view>
  </section>
  </main>
  </div>
  `
//  render: h => h(App)
}).$mount('#app')

