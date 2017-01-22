<template>
  <div class="showrooms">
    <form>
      <fieldset>
        <div class="row">
        <div class="column-50">
        <input class v-model="postcode" placeholder="Enter a postcode">
        </div>
        <div class="column-50">
        <button class="largeButton" v-if="postcode" v-on:click.prevent="fetchData(postcode)">click</button>
        </div>
        </div>
      </fieldset>
    </form>
    <table>
      <thead>
        <td></td>
      </thead>
      <tbody>
        <showroom v-for="showroom in showrooms" v-bind:item="showroom"></showroom>
      </tbody>
    </table>
  </div>
</template>

<script>
import Showroom from '../components/Showroom'

export default {
  name: 'showrooms',
  data: function () {
    return {
      postcode: '',
      showrooms: [],
      companies: [],
      isLoading: false,
      fetchError: null,
      fetchPath: 'http://zone.aradastoves.com/api/v1/'
    }
  },
  components: {
    'showroom': Showroom
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
      this.$http.get(this.fetchPath + 'getNearestDealersAnyStove?sourcepostcode=' + this.postcode).then((response) => {
          // success callback
        // console.log(response.data)
        // this.showrooms = JSON.parse(response.data)
        this.showrooms = response.data.data
      }, (response) => {
      // error callback
        console.log('failed to load...with loader...')
      })
      // }
    }
  },
  created: function () {
    // console.log('hi from showrooms ', this.showrooms)
    this.fetchData()
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
