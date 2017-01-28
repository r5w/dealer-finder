<template>
  <div class="dealers">
<form>
      <fieldset>
        <div class="row">
        <div class="column">
        <input class v-model="postcode" placeholder="Enter a postcode">
        </div>
        <div class="column">
        <button class="largeButton" v-if="postcode" v-on:click.prevent="fetchData(postcode)">click</button>
        </div>
        </div>
      </fieldset>
    </form> 
    <div v-if="isLoading"><h2>Loading...</h2></div>   
    <ul>
      <li v-for="item in nearestDealers">{{ item.company.sage_account_name}}</li>
    </ul>      
  </div>
</template>

<script>
import Dealer from '../components/Dealer'
export default {
  name: 'dealers',
  data: function () {
    return {
      postcode: '',
      dealers: [],
      nearestDealers: [],
      companies: [],
      isLoading: false,
      fetchError: null,
      fetchPath: 'http://zone.aradastoves.com/api/v1/'
    }
  },
  components: {
    'dealer': Dealer
  },
  watch: {
    '$route': function () {
      var self = this
      self.isLoading = true
      self.fetchData().then(function () {
        self.isLoading = false
      })
    }
  },
  methods: {
    fetchData: function () {
      // if (this.showrooms.length < 1) {
      // GET /someUrl
   //   this.$http.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      this.isLoading = true
      this.$http.get(this.fetchPath + 'getNearestDealersAnyStove?sourcepostcode=' + this.postcode).then((response) => {
          // success callback
        // console.log(response.data)
        // this.showrooms = JSON.parse(response.data)
        this.dealers = response.data.data
        this.nearestDealers = this.dealers.slice(0, 3)
        this.isLoading = false
      }, (response) => {
      // error callback
        console.log('failed to load...with loader...')
      })
      // }
    }
  },
  created: function () {
    // console.log('hi from showrooms ', this.showrooms)
   // this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input:not([type=submit]):not([type=file]) {
   font-size:3em;
}
.largeButton{
  font-size:3rem;
}
</style>
