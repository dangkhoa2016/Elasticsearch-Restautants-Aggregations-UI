Vue.component('restaurant-card', {
  props: {
    restaurant: {
      type: Object,
    },
  },
  methods: {
    ...Vuex.mapActions({
      setRestaurant: 'displayStore/setRestaurant'
    }),
    showRestaurant() {
      this.setRestaurant(this.restaurant);
    },
  },
  computed: {
    dataRestaurant() {
      return this.restaurant || {};
    },
    restaurantAddress() {
      const { address: { line1 = '' } = {} } = this.dataRestaurant;
      return line1;
    },
    restaurantName() {
      const { name = '' } = this.dataRestaurant;
      return name;
    },
    restaurantStar() {
      const { statistics: { reviews: { ratings = 0 } } } = this.dataRestaurant;
      return ratings;
    },
    restaurantPhoto() {
      const { photos: { medium } = {} } = this.dataRestaurant;
      const { url = 'https://cdn-icons-png.flaticon.com/512/2533/2533563.png' } = medium || {};
      return url;
    },
  },
  template: `<b-col class="mb-3">
        <b-card
          no-body
          :img-src="restaurantPhoto"
          :img-alt="restaurantName"
          img-top
          :img-title="restaurantName"
        >
          <b-card-body>
            <b-card-title title-tag="h5">{{ restaurantName }}</b-card-title>
            <b-card-text class="text-warning">
              <span class="bi-shop"></span> {{ restaurantAddress }}
            </b-card-text>
          </b-card-body>

          <b-form-rating id="rating-inline" no-border :value="restaurantStar" disabled class="rounded-0"></b-form-rating>

          <b-card-body>
            <b-button href="#" variant="info" size="sm" @click.prevent="showRestaurant">Detail</b-button>
          </b-card-body>
        </b-card>
      </b-col>`
});
