<template>
  <div class="showroom">
      <p><strong>{{item.company.sage_account_name}}</strong></p>
      <p>{{item.address.address1}}</p>
      <p>{{item.address.address2}}</p>
      <p>{{item.address.address3}}</p>
      <p>{{item.address.address4}}</p>
      <p>{{item.address.address5}}</p>
      <p>{{item.address.city}}</p>
      <p>{{item.address.state}}</p>
  </div>
</template>

<script>
export default {
  name: 'showroom',
  data () {
    return {
      items: []
    }
  },
  props: {
    item: Object
  },
  created: function () {
    console.log('hi from showroom')
   // this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showroom{
    padding:1em;
    border:1px solid grey;
    margin-bottom:0.5em;
}
</style>
