<template>
  <tr>
  <td class="column-50">
    <dl>
      <dt class="uppercase"><strong>{{item.company.sage_account_name }}</strong></dt>
     <dl>{{concatenatedAddress}}</dl>
     <a href="#" class="button button-outline">See stoves on display</a>
  </td>
  </tr>
</template>

<script>
export default {
  name: 'dealer',
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
  computed: {
    concatenatedAddress: function () {
      let addressresult = ''
      let _address = this.item.address
      let _addressgroup = []
      // var delimiter = ''
      _addressgroup.push(_address.address1)
      _addressgroup.push(_address.address2)
      _addressgroup.push(_address.address3)
      _addressgroup.push(_address.address4)
      _addressgroup.push(_address.address5)
      _addressgroup.push(_address.city)
      _addressgroup.push(_address.state)

      // create a new array containing only elements
      // from the source array that are not empty strings
      // using removeEmptyElement(haystack,needle)
      var newarr = this.removeEmptyElement(_addressgroup, '')
      addressresult = newarr.join(', ')
      return addressresult
    }
  },
  methods: {
    removeEmptyElement: function (array, element) {
      return array.filter(e => e !== element)
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
