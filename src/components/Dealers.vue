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
    <gmap :markers="nearestDealerMarkers"></gmap>     
  </div>
</template>

<script>
import Dealer from '../components/Dealer'
import Gmap from '../components/Gmap'
import Bus from '../bus'
export default {
  name: 'dealers',
  data: function () {
    return {
      postcode: '',
      dealers: [],
      nearestDealers: [],
      nearestDealerMarkers: [],
      companies: [],
      isLoading: false,
      fetchError: null,
      fetchPath: 'http://zone.aradastoves.com/api/v1/',
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }, {
        position: {lat: 11.0, lng: 11.0}
      }]
    }
  },
  components: {
    'dealer': Dealer,
    'gmap': Gmap
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
        this.nearestDealerMarkers = this.setMarkers(this.nearestDealers)
        this.isLoading = false
        Bus.$emit('event-name', {title: this.postcode, value: this.postcode})
      }, (response) => {
      // error callback
        console.log('failed to load...with loader...')
      })
      // }
    },
    setMarkers: function (arr) {
      let result = []
      for (var i = 0, len = arr.length; i < len; i++) {
        // someFn(arr[i]);
        let newobject = {position:
          {lat: arr[i].address.lat, lng: arr[i].address.lng}
        }
        result.push(newobject)
      }
      // console.log(arr)
      return result
      /*
      return [{
        position: {lat: 7.0, lng: 7.0}
      }, {
        position: {lat: 7.5, lng: 7.5}
      }]
      */
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
