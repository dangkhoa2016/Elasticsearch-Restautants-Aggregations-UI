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
    onImageError(event) {
      // console.log('Image load error, using placeholder', event);
      event.target.src = this.imagePlaceholder;
    },
  },
  computed: {
    ...Vuex.mapGetters({
      imagePlaceholder: 'displayStore/getImagePlaceholder',
    }),
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
      const { statistics: { reviews: { ratings = 0 } } = {} } = this.dataRestaurant;
      return ratings;
    },
    restaurantPhoto() {
      const { photos: { medium } = {} } = this.dataRestaurant;
      const { url = this.imagePlaceholder } = medium || {};
      return url;
    },
  },
  template: `<b-col class="mb-3">
        <b-card no-body>
          <template #header>
            <b-card-img
              :src="restaurantPhoto"
              :alt="restaurantName"
              top
              @error="onImageError"
            ></b-card-img>
          </template>
          <b-card-body>
            <b-card-title title-tag="h5">{{ restaurantName }}</b-card-title>
            <b-card-text class="text-warning">
              <span class="bi-shop"></span> {{ restaurantAddress }}
            </b-card-text>
          </b-card-body>

          <b-form-rating no-border :value="restaurantStar" disabled class="rounded-0"></b-form-rating>

          <b-card-body>
            <b-button href="#" variant="info" size="sm" @click.prevent="showRestaurant">Detail</b-button>
          </b-card-body>
        </b-card>
      </b-col>`
});
