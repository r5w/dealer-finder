<template>
  <div class="user">
    <h1>postcodes searched</h1>
    <ul>
      <li v-for="item in choices" >
        <span class="item" v-on:click="triggerPostcodeSearch(item.title)">{{ item.title}}</span>
      </li>
    </ul>      
  </div>
</template>

<script>
import Bus from '../bus'
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
    triggerPostcodeSearch: function (postcode) {
      Bus.$emit('searchPostcode', postcode)
    },
    rememberChoices: function (choice) {
      // check if object exists in list already
      if (this.choices.indexOf(choice) === -1) {
        this.choices.push(choice)
      }
    }
  },
  created: function () {
    console.log('hi from User')
   // this.fetchData()
   // this.rememberChoices({title: 'blach', value: 'ex135hu'})
    // triggered to do something..
    Bus.$on('event-name', (someData) => {
      this.rememberChoices(someData)
      console.log(someData.title, someData.value)
      // do something
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user{
    font-size:2rem;
    padding: 1em;
  }
  .user h1{
    font-size: 0.9em;
    font-weight:bold;
    text-transform: uppercase;
  }
  .user ul{
    list-style-type: none;
    }

</style>
