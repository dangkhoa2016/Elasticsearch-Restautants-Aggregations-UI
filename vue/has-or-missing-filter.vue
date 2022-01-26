<template>

  <filter-card @reset="reset" :title="title">
    <template #default>
      <b-form-radio-group
        v-model="radioSelected"
        :options="options"
        :name="id" plain
        stacked @change="onChange"
      ></b-form-radio-group>
    </template>
  </filter-card>

</template>

<script>
  export default {
    data() {
      return {
        radioSelected: this.value,
      }
    },
    props: {
      value: String,
      title: {
        type: String,
        default: 'Has Or Missing Filter'
      },
      filterKey: {
        type: String,
        default: 'has-or-missing-filter'
      },
      options: {
        type: Array,
        default: [
          { text: 'Yes', value: '1' },
          { text: 'No', value: '2' },
        ]
      },
    },
    computed: {
      ...Vuex.mapGetters({
        resetFilterFlag: 'searchStore/getResetFilterFlag',
      }),
      id () {
        return `hmf-${new Date().valueOf()}`;
      },
    },
    watch: {
      resetFilterFlag() {
        this.internalReset();
      }
    },
    mounted() {
      // console.log('Has Or Missing Filter', this.value, this.radioSelected, JSON.stringify(this.options));
      this.setSearchParam({ [this.filterKey]: this.radioSelected });
    },
    methods: {
      ...Vuex.mapActions({
        setSearchParam: "searchStore/setSearchParam",
        search: "searchStore/search"
      }),
      reset() {
        this.radioSelected = null;
        this.callSearch();
      },
      callSearch() {
        this.setSearchParam({ [this.filterKey]: this.radioSelected });
        this.search();
      },
      internalReset() {
        this.radioSelected = null;
      },
      onChange() {
        console.log('change', this.radioSelected);
        this.$emit('input', this.radioSelected);
        this.callSearch();
      }
    }
  }
</script>