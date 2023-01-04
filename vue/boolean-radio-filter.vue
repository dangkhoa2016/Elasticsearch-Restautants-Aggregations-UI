<template>

  <has-or-missing-filter @reset='reset'
    :title='title' :options='options'
    v-model='radioSelected'
    :filter-key='filterKey'>
  </has-or-missing-filter>

</template>

<script>
  export default {
    data() {
      return {
        radioSelected: this.value,
      };
    },
    props: {
      value: String,
      title: {
        type: String,
        default: 'Boolean Radio Filter',
      },
      filterKey: {
        type: String,
        default: 'boolean-radio-filter',
      },
      options: {
        type: Array,
        default: [
          { text: 'Yes', value: '1' },
          { text: 'No', value: '0' },
          { text: 'Not set', value: '2' },
        ],
      },
    },
    computed: {
      ...Vuex.mapGetters({
        resetFilterFlag: 'searchStore/getResetFilterFlag',
      }),
    },
    watch: {
      resetFilterFlag() {
        this.internalReset();
      },
    },
    mounted() {
      // console.log('Boolean Radio Filter', this.value, this.radioSelected);
      this.setSearchParam({ [this.filterKey]: this.radioSelected });
    },
    methods: {
      ...Vuex.mapActions({
        setSearchParam: 'searchStore/setSearchParam',
        search: 'searchStore/search',
      }),
      internalReset() {
        this.radioSelected = null;
      },
      reset() {
        this.internalReset();
        this.setSearchParam({ [this.filterKey]: this.radioSelected });
        this.search();
      },
    },
  }
</script>
