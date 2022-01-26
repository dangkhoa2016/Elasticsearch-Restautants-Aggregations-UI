<template>

  <transition name="fade">
    <b-col cols="sm-3" v-if="showFilter">
      <component :is="filter.type" v-for="filter in filters"
      :title="filter.title"
      :filter-key="filter.name"
      :options="filter.options"
      ></component>
    </b-col>
  </transition>

</template>

<script>
  export default {
    computed: {
      ...Vuex.mapGetters({
        filters: 'searchStore/getFilters',
        showFilter: 'appStore/getShowFilter',
      }),
    },
    mounted() {
    },
    data() {
      return {
      }
    }
  }
</script>