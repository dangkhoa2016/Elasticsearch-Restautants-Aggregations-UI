<template>

  <div class='mb-3'>
    <div class='input-group input-group-sm'>
      <b-button variant='outline-danger' @click='clearSearchValue'>Clear</b-button>

      <div class='input-group-prepend' title='Search by field'>
        <b-dropdown variant='info' size='sm' :text='currentSearchField' class=''>
          <b-dropdown-item v-for='field in searchFields'
            @click='searchByField(field.value)'>{{ field.text }}</b-dropdown-item>
        </b-dropdown>
      </div>

      <b-form-input ref='inpSearch' @keyup.enter='startSearch' v-model='searchValue'></b-form-input>

      <b-button variant='warning' @click='startSearch'>Search</b-button>
    </div>

    <div class='mt-3 d-flex justify-content-between'>
      <div class='text-start'>
        <b-dropdown variant='info' size='sm' :text='currentPageSize' class=''>
          <b-dropdown-item v-for='pageSize in pageSizeOptions'
            @click='setPaging(pageSize.value)'>{{ pageSize.text }}</b-dropdown-item>
        </b-dropdown>

        <b-button size='sm' variant='danger' @click='resetAllFilters'>Reset all filters</b-button>
      </div>

      <div class='text-end'>
        <b-dropdown variant='info' size='sm' :text='currentSearchMethod' class=''>
          <b-dropdown-item v-for='method in filteredSearchMethods'
            @click='searchByMethod(method.value)'>{{ method.text }}</b-dropdown-item>
        </b-dropdown>

        <b-dropdown variant='info' class='right-sorting' text='Sorting' size='sm' ref='dropdownSorting' right>
          <div class='mx-3'>
            <b-form-group label='Name' @submit.stop.prevent
              class='mb-3' label-class='fw-bold'>
              <b-form-radio-group
                v-model='sortByName'
                :options='sortOptions'
                name='sortByName'
                stacked plain
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group label='Rating' @submit.stop.prevent
              class='mb-3' label-class='fw-bold'>
              <b-form-radio-group
                v-model='sortByRating'
                :options='sortOptions'
                name='sortByRating'
                stacked plain
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group label='Published on' @submit.stop.prevent
              class='mb-3' label-class='fw-bold'>
              <b-form-radio-group
                v-model='sortByPublishedOn'
                :options='sortOptions'
                name='sortByPublishedOn'
                stacked plain
              ></b-form-radio-group>
            </b-form-group>

            <div class='d-flex justify-content-between'>
              <b-button variant='primary' size='sm' @click='submitSorting'>Submit</b-button>
              <b-button variant='secondary' size='sm' @click='resetSorting'>Reset</b-button>
            </div>
          </div>
        </b-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        searchValue: '',
        searchFieldSelected: 'name',
        searchFields: [
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'description' },
          { text: 'Contact phone', value: 'contact_phone' },
          { text: 'Address line 1', value: 'address_line1' },
        ],
        searchMethodSelected: '0',
        searchMethods: [
          { text: 'Starts with', value: '1' },
          { text: 'Ends with', value: '2' },
          { text: 'Contains', value: '3' },
          { text: 'Contains exact', value: '4' },
          { text: 'None', value: '0' },
        ],
        sortOptions: [{
          text: 'Ascending',
          value: 'asc'
        }, {
          text: 'Descending',
          value: 'desc'
        }, {
          text: 'None',
          value: '0'
        }],
        sortByName: '0',
        sortByRating: '0',
        sortByPublishedOn: '0',
        pageSizeSelected: 0,
        pageSizeOptions: [4, 8, 12, 16, 20, 24, 40, 60].map(x => ({ text: '' + x, value: x })),
      }
    },
    computed: {
      currentSearchField() {
        var selected = this.searchFieldSelected && this.searchFields.find(s => s.value === this.searchFieldSelected);
        return selected ? selected.text : 'Search by field';
      },
      currentPageSize() {
        var selected = this.pageSizeSelected && this.pageSizeOptions.find(s => s.value === this.pageSizeSelected);
        return `Page size: ${selected ? selected.text : ''}`;
      },
      currentSearchMethod() {
        var selected = this.searchMethodSelected && this.searchMethods.find(s => s.value === this.searchMethodSelected);
        var text = selected ? selected.text : 'None';
        return text === 'None' ? 'Search by method' : text;
      },
      filteredSearchMethods() {
        if (['description', 'address_line1'].indexOf(this.searchFieldSelected) !== -1)
          return this.searchMethods.filter(sm => sm.value !== '2');
        else
          return this.searchMethods;
      },
    },
    mounted() {
      this.pageSizeSelected = this.$store.getters['searchStore/getPageSize'];
    },
    methods: {
      ...Vuex.mapActions({
        setSearchParam: 'searchStore/setSearchParam',
        setSortParams: 'searchStore/setSortParams',
        toggleResetFilterFlag: 'searchStore/toggleResetFilterFlag',
        setPageSize: 'searchStore/setPageSizeParam',
        search: 'searchStore/search',
      }),
      clearSearchValue() {
        this.searchValue = '';
        this.$nextTick(() => {
          this.$refs.inpSearch.focus();
          this.startSearch();
        });
      },
      resetSorting() {
        this.sortByName = '0';
        this.sortByRating = '0';
        this.sortByPublishedOn = '0';
        this.submitSorting();
      },
      startSearch() {
        this.setSearchParam({ 'searchText': {
            value: this.searchValue,
            method: this.searchMethodSelected,
            field: this.searchFieldSelected,
          }
        });
        this.search();
      },
      submitSorting() {
        this.$refs.dropdownSorting.hide(true);
        this.setSortParams({
          'name.keyword': this.sortByName,
          'statistics.reviews.ratings': this.sortByRating,
          'published_on': this.sortByPublishedOn,
        });
        this.startSearch();
      },
      resetAllFilters() {
        this.searchValue = '';
        this.searchFieldSelected = 'name';
        this.searchMethodSelected = '0';

        this.toggleResetFilterFlag();
        this.startSearch();
      },
      searchByField(field) {
        this.searchFieldSelected = field;
        this.startSearch();
      },
      searchByMethod(method) {
        this.searchMethodSelected = method;
        this.startSearch();
      },
      setPaging(pageSize) {
        this.pageSizeSelected = pageSize;
        this.setPageSize(this.pageSizeSelected);
        this.startSearch();
      },
    },
  }
</script>
