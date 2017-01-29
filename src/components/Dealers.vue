<template>
  <div class="dealers">
<form>
      <fieldset>
        <div class="row">
        <div class="column column-50">
        <input class v-model="postcode" placeholder="Enter a postcode">
        </div>
        <div class="column column-30">
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
import Bus from '../bus'
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
        Bus.$emit('event-name', {title: this.postcode, value: this.postcode})
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
    // triggered to do something..
    Bus.$on('searchPostcode', (someData) => {
      this.postcode = someData
      this.fetchData(someData)
     // this.rememberChoices(someData)
     // console.log(someData.title, someData.value)
      // do something
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input:not([type=submit]):not([type=file]) {
   font-size:1.7em;
}
.largeButton{
  font-size:3rem;
}
  .dealers{
    border-left:1px solid gray;
    padding: 1em 2em;
  }
</style>
