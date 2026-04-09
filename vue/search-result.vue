<template>
  
  <b-card header-tag='header' class='mb-3 result-card'
    no-body footer-tag='footer'>
    <template #header>
      <h6 class='mb-0'><i class='bi-arrows-fullscreen'></i> Total restaurants result: {{ total }}</h6>
    </template>
    
    <div class='p-2'>
      <div v-if='restaurants.length === 0' class='text-center text-secondary py-5'>
        <span class='bi-emoji-frown'></span> No restaurant found, please try with different search criteria.
        <p>Your current filters:</p>
        <div class=''>
          <b-badge v-for='(value, key) in searchParams' :key='key' class='bg-secondary mx-1'>
            {{ key }}: {{ value }}
          </b-badge>
        </div>
      </div>
      <div v-else>
        <b-row class='row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-2'>
          <restaurant-card :restaurant='restaurant' v-for='restaurant in restaurants'></restaurant-card>
        </b-row>

        <b-pagination
          v-model='currentPage' :total-rows='total'
          :per-page='perPage' class='mt-3'
          @change='setFrom' align='center'
        ></b-pagination>
      </div>
    </div>
  </b-card>

</template>

<script>
  export default {
    data() {
      return {
        restaurants: [],
        total: 0,
        currentPage: 1,
      };
    },
    computed: {
      ...Vuex.mapGetters({
        searchResults: 'searchStore/getSearchResults',
        perPage: 'searchStore/getPageSize',
        fromParam: 'searchStore/getFrom',
        searchParams: 'searchStore/getSearchParams',
      }),
    },
    methods: {
      ...Vuex.mapActions({
        setFromParam: 'searchStore/setFromParam',
        search: 'searchStore/search',
      }),
      setFrom(page) {
        this.setFromParam(page);
        this.search();
      },
      scrollTop() {
        const rootEle = document.documentElement;
        rootEle.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      transformRestaurantData(restaurant) {
        const record = restaurant._source || {};
        return {
          ...record,
          id: restaurant._id,
        };
      },
    },
    watch: {
      searchResults(val) {
        const { hits: {
            hits = [],
            total: { value = 0 } = {},
          } = {} } = val || {};
        this.restaurants = hits.length > 0 ? hits.map(this.transformRestaurantData) : hits;
        this.total = value;
        this.scrollTop();
      },
      fromParam(val) {
        if (val === 0)
          this.currentPage = 1;
      },
    },
  }
</script>
