<template>
  <div class="user">
    <ul>
      <li v-for="item in choices">{{ item.title}}</li>
    </ul>      
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      choices: []
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
    },
    rememberChoices: function (choice) {
      this.choices.push(choice)
    }
  },
  created: function () {
    console.log('hi from componenttemplate')
   // this.fetchData()
    this.rememberChoices({title: 'blach', value: 'ex135hu'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
