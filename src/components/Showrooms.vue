<template>
  <div class="showrooms">
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
    <table>
      <thead>
        <td></td>
      </thead>
      <tbody>
        <tr v-if="nearestShowrooms.length>0">
          <td>Showing 3 nearestShowrooms</td>
        </tr>
        <gmap :markers="markers"></gmap>
        <showroom v-for="showroom in nearestShowrooms" v-bind:item="showroom"></showroom>
      </tbody>
    </table>
  </div>
</template>

<script>
import Showroom from '../components/Showroom'
import Gmap from '../components/Gmap'

export default {
  name: 'showrooms',
  data: function () {
    return {
      postcode: '',
      showrooms: [],
      nearestShowrooms: [],
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
    'showroom': Showroom,
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
        if (response.valid) {
          this.showrooms = response.data.data
          this.nearestShowrooms = this.showrooms.slice(0, 3)
          this.isLoading = false
        } else {
          return false
        }
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
