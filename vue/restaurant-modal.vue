<template>

  <b-modal size="lg" v-model="modalShow" id="modal-info" ok-only ok-title="Close">
    <template #modal-header="{ close }">
      <h5>Restaurant detail</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close()"></button>
    </template>

    <b-tabs content-class="mt-3">
      <b-tab title="General" active>
        <b-row>
          <b-col><h2>{{ restaurant.name }}</h2></b-col>
        </b-row>
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="restaurantPhoto" alt="Image" class="rounded"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-text>
              <span class="bi-brightness-high"></span> Primary cuisine: {{ restaurant.primaryCuisine }}
            </b-card-text>
            <div class="card-text" v-html="restaurant.description">
            </div>
            <div v-if="restaurant.photos">
              <hr>
              <h6>More photos size</h6>
              <b-button-group size="sm">
                <b-button variant="danger" :href="restaurant.photos.xsmall.url" v-if="restaurant.photos.xsmall" target="_blank">X-Small</b-button>
                <b-button variant="warning" :href="restaurant.photos.small.url" v-if="restaurant.photos.small" target="_blank">Small</b-button>
                <b-button variant="info" :href="restaurant.photos.legacy.url" v-if="restaurant.photos.legacy" target="_blank">Legacy</b-button>
              </b-button-group>
            </div>
          </b-col>
        </b-row>
        <b-row>
          
        </b-row>
      </b-tab>
      <b-tab title="Features">
        <b-row>
          <b-col cols="sm-5">
            <b-list-group>
              <b-list-group-item>
                <span class="bi-asterisk text-success"></span> Has sub type: {{ restaurant.features && restaurant.features.subtype | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-archive-fill"></span> Has bar: {{ restaurant.features && restaurant.features.bar | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-app-indicator text-info"></span> Has counter: {{ restaurant.features && restaurant.features.counter | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-activity"></span> Has high top: {{ restaurant.features && restaurant.features.highTop | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-bag-dash text-warning"></span> Has outdoor: {{ restaurant.features && restaurant.features.outdoor | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-award-fill rounded border border-info"></span> Pickup enabled: {{ restaurant.features && restaurant.features.pickupEnabled | to_yes_no }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col cols="sm-7">
            <b-list-group>
              <b-list-group-item>
                <span class="bi-bookmark-check text-danger"></span> Is promoted: {{ restaurant.isPromoted | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-chat-left-dots"></span> Is pinned: {{ restaurant.isPinned | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-calendar-check-fill text-primary"></span> Has takeout: {{ restaurant.hasTakeout | to_yes_no }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="bi-calculator"></span> Order online: {{ restaurant.orderOnlineLink || 'No' }}
              </b-list-group-item>
            </b-list-group>

            <hr/>

            <h6>Dining style</h6>
            <div>
              <span class="badge mx-1" :class="`bg-${tagColor(index)}`" v-for="(style, index) in restaurant.diningStyles">{{ style }}</span>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Other info">
        <h6>Address</h6>
        <b-list-group>
          <b-list-group-item class="text-secondary">
            <span class="bi-shop"></span> Line 1: <b>{{ restaurantAddress.line1 }}</b>
          </b-list-group-item>
          <b-list-group-item v-if="restaurantAddress.line2" class="text-secondary">
            <span class="bi-safe"></span> Line 2: <b>{{ restaurantAddress.line2 }}</b>
          </b-list-group-item>
          <b-list-group-item class="text-secondary">
            <span class="bi-receipt"></span> City: <b>{{ restaurantAddress.city }}</b>
          </b-list-group-item>
          <b-list-group-item class="text-secondary">
            <span class="bi-body-text"></span> State: <b>{{ restaurantAddress.state }}</b>
          </b-list-group-item>
          <b-list-group-item class="text-secondary">
            <span class="bi-bar-chart-line-fill"></span> Postcode: <b>{{ restaurantAddress.postCode }}</b>
          </b-list-group-item>
          <b-list-group-item class="text-secondary">
            <span class="bi-geo-alt"></span> Coordinate: <b>{{ restaurant.location && restaurant.location.lat }}, {{ restaurant.location && restaurant.location.lon }}</b>
          </b-list-group-item>
        </b-list-group>
        
        <b-row>
          <b-col cols="sm">
            <h6 class="mt-3">User reviews</h6>
            <b-list-group>
              <b-list-group-item class="text-info">
                <span class="bi-stars"></span> Avg. stars: <b>{{ restaurantReviews.ratings }}</b>
              </b-list-group-item>
              <b-list-group-item class="text-info">
                <span class="bi-list-stars"></span> Total: <b>{{ restaurantReviews.allTimeTextReviewCount }}</b>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        
          <b-col cols="sm">
            <h6 class="mt-3">Other</h6>
            <b-list-group>
              <b-list-group-item class="text-warning">
                <span class="bi-telephone-fill"></span> Contact phone: <b>{{ restaurant.contactInformation }}</b>
              </b-list-group-item>
              <b-list-group-item class="text-warning">
                <span class="bi-reception-2"></span> Neighborhood: <b>{{ restaurant.neighborhood }}</b>
              </b-list-group-item>
              <b-list-group-item class="text-warning">
                <span class="bi-calendar"></span> Published on: <b>{{ restaurant.published_on | date }}</b>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>


      </b-tab>
    </b-tabs>
  </b-modal>

</template>

<script>
  export default {
    created() {
      // console.log('this.restaurant', this.restaurant);
    },
    methods: {
      tagColor(index) {
        index = (Math.abs(index || 0)) % this.colors.length;
        return this.colors[index];
      }
    },
    data() {
      return {
        modalShow: false
      }
    },
    computed: {
      ...Vuex.mapGetters({
        restaurant: 'displayStore/getRestaurant',
        colors: 'displayStore/getColors',
        restaurantAddress: 'displayStore/getRestaurantAddress',
        restaurantName: 'displayStore/getRestaurantName',
        restaurantReviews: 'displayStore/getRestaurantReviews',
        restaurantPhoto: 'displayStore/getRestaurantPhoto',
      }),
      ...Vuex.mapState({
      }),
    },
    watch: {
      restaurant(val) {
        this.modalShow = !this.modalShow;
      }
    }
  }
</script>