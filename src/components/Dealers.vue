<template>
  <div class="dealers">
<form>
      <fieldset>
        <div class="row">
        <div class="column column-50">
        <input class v-model="postcode" placeholder="Enter a postcode">
        </div>
        <div class="column column-30">
        <button class="largeButton"  v-on:click.prevent="fetchData(postcode)">click</button>
        </div>
        </div>
      </fieldset>
    </form> 
    <div v-if="isLoading"><h2>Loading...</h2></div>   
    <ul>
      <li v-for="item in nearestDealers">{{ item.company.sage_account_name}}</li>
    </ul>
    <gmap ref="dealergmap" :markers="nearestDealerMarkers"  :bounds="nearestDealerMarkers" ></gmap>
    <!--<div  class="column" style="padding:1em;height:auto;background-color:yellow;display:block;font-size:0.7em;">Map bounds:<pre>{{ $data }}</pre><div>    -->
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
      postcode: 'EX13 5HU',
      dealers: [],
      nearestDealers: [],
      nearestDealerMarkers: [],
      center: {lat: 10.0, lng: 10.0},
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
       // this.center = this.setCentre(this.nearestDealers)
        this.isLoading = false
        // this.$refs.dealergmap.$mapObject.bounds = null
       // this.panBounds()
        Bus.$emit('event-name', {title: this.postcode, value: this.postcode})
      }, (response) => {
      // error callback
        console.log('failed to load...with loader...')
      })
      // }
    },
    setMarkers: function (arr) {
      let result = []
      // let b = new google.maps.LatLngBounds()
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
    },
    setCentre: function (arr) {
      // console.log(arr[0])
      // let result = []
     // for (var i = 0, len = arr.length; i < len; i++) {
        // someFn(arr[i]);
      let result = {lat: arr[0].address.lat, lng: arr[0].address.lng}
      // result.push(newobject)
      // }
      return result
      /*
      return [{
        position: {lat: 7.0, lng: 7.0}
      }, {
        position: {lat: 7.5, lng: 7.5}
      }]
      */
    },
    fitBounds: function () {
      /*
      var b = new Gmap.Map.LatLngBounds()

      b.extend({
        lat: 33.972,
        lng: 35.4054
      })
      b.extend({
        lat: 33.7606,
        lng: 35.64592
      })

      this.$refs.mmm.fitBounds(b)
 */
    },
    panBounds: function () {
      /*
      var b = new Gmap.Map.LatLngBounds()

      b.extend({
        lat: 33.972,
        lng: 35.4054
      })
      b.extend({
        lat: 33.7606,
        lng: 35.64592
      })
      */
      // this.$refs.dealergmap.$mapObject.fitBounds()
      // this.$refs.dealergmap.resetBounds(this.nearestDealerMarkers)
      // console.log(this.$refs.dealergmap.$mapObject)
     // console.log(Gmap)
      // this.$refs.dealergmap.mapObject.fitBounds()
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
  },
  mounted: function () {
    // this.$refs.dealergmap.resetBounds(this.nearestDealerMarkers)
    // this.$refs.dealermap.$mapCreated.then(() => // this.$refs.dealergmap.setBounds())
    // console.log('map is ready'))
    console.log('map is ready')
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
