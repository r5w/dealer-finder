<template>
  <div class="dealers">
    <ul>
      <li v-for="dealer in dealers">{{ dealer.title}}</li>
    </ul>      
  </div>
</template>

<script>
export default {
  name: 'dealers',
  data () {
    return {
      dealers: []
    }
  },
  methods: {
    fetchData: function () {
      // GET /someUrl
      this.$http.get('https://jsonplaceholder.typicode.com/albums').then((response) => {
        // success callback
        // console.log(response)
        // this.dealers = JSON.parse(response)
        this.dealers = response.body
      }, (response) => {
        // error callback
        console.log('failed to load...with loader...')
      })
    }
  },
  created: function () {
    console.log('hi from dealers')
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
