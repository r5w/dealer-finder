<template>
  <gmap-map class="gmapMain"
    :center="center"
    :zoom="10"
     ref="mmm"
    @zoom_changed= "update('zoom', $event)"
    @maptypeid_changed= "update('mapType', $event)"
    @bounds_changed= "update('bounds', $event)"
    @center_changed= "update('reportedCenter', $event)"
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
        mapBounds: {},
        reportedCenter: {},
        zoom: 7,
        mapType: 'terrain',
        bounds: [],
        center: {lat: 8, lng: 8}
        // center: {}
      }
    },
    props: {
    //  bounds: {},
      markers: {}
    },
    methods: {
      helloFromGmap: function () {
        console.log('helloFromGmap')
      },
      resetBounds: function (arr) {
        console.log('resetting bounds...', arr)
        // let result = []
        // // let b = new google.maps.LatLngBounds()
        // for (var i = 0, len = arr.length; i < len; i++) {
        //   // someFn(arr[i]);
        //   let newobject = {position:
        //     {lat: arr[i].address.lat, lng: arr[i].address.lng}
        //   }
        //   result.push(newobject)
        // }
        // return result
      },
      update: function (field, event) {
        if (field === 'reportedCenter') {
          // N.B. It is dangerous to update this.center
          // Because the center reported by Google Maps is not exactly
          // the same as the center you pass it.
          // Instead we update this.center only when the input field is changed.

          console.log('CENTER REPORTED', event)
          this.reportedCenter = {
            lat: event.lat(),
            lng: event.lng()
          }
          // If you wish to test the problem out for yourself, uncomment the following
          // and see how your browser begins to hang:
          // this.center = _.clone(this.reportedCenter)
        } else if (field === 'bounds') {
          // this.resetBounds()
          this.zoom = 12
          this.mapBounds = null
          this.mapBounds = event
          console.log('bounds updatd...', event)
        } else {
          this.$set(this, field, event)
        }
      },
      setBounds: function () {
        // console.log(this.$refs.mmm.$mapObject.getBounds())
        // let b = new VueGoogleMaps.Map.LatLngBounds()
        let b = this.$refs.mmm.$mapObject.getBounds()

        b.extend({
          lat: 33.972,
          lng: 35.4054
        })
        b.extend({
          lat: 33.7606,
          lng: 35.64592
        })
        this.$refs.mmm.fitBounds(b)
      }
    },
    created: function () {
      this.helloFromGmap()
     // this.setBounds()
    },
    mounted: function () {
      console.log('mmm is mounted.....', this.$refs.mmm.$mapCreated)
      this.$refs.mmm.$mapCreated.then(() => {
        // console.log('map is mounted....')
        console.log(1)
        console.log(2)
      })
      // this.setBounds()
    }
}
</script>
<style>
.gmapMain{ height:20em;width:30em;}
</style>