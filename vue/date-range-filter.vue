<template>

  <filter-card @reset='reset' :title='title'>
    <template #default>
      <strong>Pre Define Range</strong>
      <b-form-radio-group class='mb-2'
        v-model='radioSelected'
        :options='options'
        :name='id' plain
        stacked @change='onPredefinedRangeChange'
      ></b-form-radio-group>

      <vue-ctk-date-time-picker only-date range
      output-format='YYYY-MM-DDTHH:mm:ss.SSS[Z]' formatted='ll' v-model='range'
      label='Select date range'
      @is-hidden='onDateSelected'></vue-ctk-date-time-picker>
    </template>
  </filter-card>

</template>

<script>
  export default {
    data() {
      return {
        radioSelected: null,
        range: null,
      };
    },
    props: {
      title: {
        type: String,
        default: 'Date Range Filter',
      },
      filterKey: {
        type: String,
        default: 'date-range-filter',
      },
      options: {
        type: Array,
        default: [],
      },
    },
    computed: {
      ...Vuex.mapGetters({
        resetFilterFlag: 'searchStore/getResetFilterFlag',
      }),
      id () {
        return `dr-${new Date().valueOf()}`;
      },
    },
    watch: {
      resetFilterFlag() {
        this.internalReset();
      },
    },
    methods: {
      ...Vuex.mapActions({
        setSearchParam: 'searchStore/setSearchParam',
        search: 'searchStore/search'
      }),
      onPredefinedRangeChange() {
        this.range = { 'start': this.radioSelected[0], 'end': this.radioSelected[1] };
        this.onDateSelected();
      },
      onDateSelected() {
        // console.log('this.range', this.range);
        this.setSearchParam({ [this.filterKey]: this.range });
        this.search();
      },
      reset() {
        this.internalReset();
        this.onDateSelected();
      },
      internalReset() {
        this.range = null;
        this.radioSelected = null;
      },
    },
  }
</script>
