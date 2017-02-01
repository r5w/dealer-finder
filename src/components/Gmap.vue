<template>
  <gmap-map class="gmapMain"
    :center="center"
    :zoom="3"
  >
    <gmap-marker
      v-for="m in this.markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>
 
<script>
  // ///////////////////////////////////////
  // New in 0.4.0
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyA6pqtmkPgja6Sq2eAN2jQbJSIarIKtKqk'
      // v: 'OPTIONAL VERSION NUMBER',
      // libraries: 'places', //// If you need to use place input
    }
  })

export default {
    data () {
      return {
        center: {lat: 8, lng: 8}
      }
    },
    props: {
      markers: {}
    }
}
</script>
<style>
.gmapMain{ height:30em;width:40em;}
</style>