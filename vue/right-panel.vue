<template>

  <transition name='fade'>
    <b-col cols='sm-9' v-if='showFilter'>
      <search-top></search-top>

      <search-result></search-result>
    </b-col>
  </transition>

</template>

<script>
  export default {
    computed: {
      ...Vuex.mapGetters({
        showFilter: 'appStore/getShowFilter',
      }),
    },
    methods: {
      ...Vuex.mapActions({
        toggleResetFilterFlag: 'searchStore/toggleResetFilterFlag',
      }),
    },
  }
</script>
