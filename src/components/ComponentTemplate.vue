<template>
  <div class="componenttemplate">
    <ul>
      <li v-for="item in items">{{ item.title}}</li>
    </ul>      
  </div>
</template>

<script>
export default {
  name: 'componenttemplate',
  data () {
    return {
      items: []
    }
  },
  methods: {
    fetchData: function () {
      // GET /someUrl
      // this.$http.get('https://jsonplaceholder.typicode.com/albums').then((response) => {
        // success callback
        // console.log(response)
        // this.items = JSON.parse(response)
        // this.items = response.body
     // }, (response) => {
        // error callback
       // console.log('failed to load...with loader...')
     // })
    }
  },
  created: function () {
    console.log('hi from componenttemplate')
   // this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
