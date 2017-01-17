<template>
  <div id="app">
    <h1>test</h1>
    <showrooms></showrooms>
  </div>
</template>

<script>
import Showrooms from './components/Showrooms'

export default {
  name: 'app',
  components: {
    Showrooms
  },
  created: function () {
    console.log('hi')
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      // GET /someUrl
      this.$http.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        // success callback
        console.log(response)
      }, (response) => {
        // error callback
        console.log('failed to load...with loader...')
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
