<template>
  <tr>
  <td class="column-50">
    <dl>
      <dt class="uppercase"><strong>{{item.name }}</strong></dt>
     <dl>{{item.active}}</dl>
     <a href="#" class="button button-outline">See stoves on display</a>
  </td>
  </tr>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
      items: []
    }
  },
  props: {
    item: Object
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created: function () {
   // console.log('hi from showroom')
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
.uppercase{ text-transform:uppercase;}
.largeText{font-size:2rem;}
</style>
