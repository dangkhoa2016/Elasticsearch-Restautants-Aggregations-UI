<template>

  <filter-card @reset='reset' :title='title'>
    <template #default>
      <b-form-checkbox-group
        v-model='checkboxSelected1'
        :options='options1' stacked
        :name='cbId' plain @change='onChange'
      ></b-form-checkbox-group>

      <b-collapse v-if='options2.length > 0' :id='bodyId' v-model='collapseVisible'>
        <b-form-checkbox-group
          v-model='checkboxSelected2'
          :options='options2' stacked
          :name='cbId' plain @change='onChange'
        ></b-form-checkbox-group>
      </b-collapse>
    </template>

    <template #more-button>
      <b-button v-if='options2.length > 0' size='sm'
        class='float-start' variant='info' v-b-toggle='bodyId'>{{ textToggle }}</b-button>
    </template>
  </filter-card>

</template>

<script>
  export default {
    data() {
      var options1 = [];
      var options2 = [];
      if (this.options.length > 0) {
        options2 = JSON.parse(JSON.stringify(this.options));
        options1 = options2.splice(0, 5);
      }

      return {
        cbId: `cb-${new Date().valueOf()}`,
        bodyId: `mcf-${new Date().valueOf()}`,
        collapseVisible: false,
        checkboxSelected1: [],
        checkboxSelected2: [],
        options1,
        options2,
      };
    },
    props: {
      title: {
        type: String,
        default: 'Multiple Checkbox Filter',
      },
      filterKey: {
        type: String,
        default: 'multiple-checkbox-filter',
      },
      options: {
        type: Array,
      },
    },
    computed: {
      ...Vuex.mapGetters({
        resetFilterFlag: 'searchStore/getResetFilterFlag',
      }),
      textToggle() {
        return this.collapseVisible ? 'Show less' : 'Show more';
      },
      checkedItems () {
        return this.checkboxSelected1.concat(this.checkboxSelected2);
      },
    },
    watch: {
      resetFilterFlag() {
        this.internalReset();
      },
    },
    mounted() {
      this.setSearchParam({ [this.filterKey]: this.checkedItems });
    },
    methods: {
      ...Vuex.mapActions({
        setSearchParam: 'searchStore/setSearchParam',
        search: 'searchStore/search',
      }),
      internalReset() {
        this.checkboxSelected1 = [];
        this.checkboxSelected2 = [];
      },
      reset() {
        this.internalReset();
        this.onChange();
      },
      onChange() {
        this.setSearchParam({ [this.filterKey]: this.checkedItems });
        this.search();
      },
    },
  }
</script>
