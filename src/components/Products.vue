<template>
  <div class="products">
<form>
      <fieldset>
        <div class="row">
        <div class="column column-50">
        <input class v-model="productCode" placeholder="Product name or code...">
        </div>
        <div class="column column-30">
        <button class="largeButton" v-if="productCode" v-on:click.prevent="fetchData(productCode)">click</button>
        </div>
        </div>
      </fieldset>
    </form> 
    <div v-if="isLoading"><h2>Loading...</h2></div>   
            <product v-for="product in nearestProducts" v-bind:item="product"></showroom>
    <ul>
      <li v-for="item in nearestProducts">{{ item.name}}</li>
    </ul>      
  </div>
</template>

<script>
import Product from '../components/Product'
import Bus from '../bus'
export default {
  name: 'products',
  data: function () {
    return {
      productCode: '',
      products: [],
      nearestProducts: [],
      companies: [],
      isLoading: false,
      fetchError: null,
      fetchPath: 'http://zone.aradastoves.com/api/v1/'
    }
  },
  components: {
    'product': Product
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
      this.$http.get(this.fetchPath + 'stovesearch?qry=' + this.productCode).then((response) => {
          // success callback
        // console.log(response.data)
        // this.showrooms = JSON.parse(response.data)
        this.products = response.data
        this.nearestProducts = this.products.slice(0, 10)
        this.isLoading = false
        // Bus.$emit('event-name', {title: this.productCode, value: this.productCode})
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
      this.productCode = someData
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
