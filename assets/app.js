
(async function () {

  const loadHtml = function (file) {
    return new Promise((resolve, reject) => {
      fetch(file)
        .then(res => res.text())
        .then(html => {
          app.html = html;
          resolve();
        }).catch(ex => console.log(ex));
    });
  };
  const store = new Vuex.Store({
    modules: {
      appStore: window['store'].appStore,
      searchStore: window['store'].searchStore,
      displayStore: window['store'].displayStore,
    }
  });

  await loadHtml('/assets/app.html');
  
  window.app = new Vue({
    el: '#app',
    store,
    template: app.html,
    async created() {
      // await this.loadFilters();
      // this.search();
    },
    mounted() {
      this.setPageSize(24);
    },
    methods: {
      ...Vuex.mapActions({
        setPageSize: 'searchStore/setPageSizeParam',
        search: 'searchStore/search',
        loadFilters: 'searchStore/loadFilters',
        setEndpoint: 'appStore/setEndpoint',
        setShowFilter: 'appStore/setShowFilter'
      }),
      setCompleted() {
        this.setShowFilter(true);

        //clear window variables to make app secure
        // window.app = null;
        delete window.store;

        // console.log('start search');
        this.search();
      }
    },
    computed: {
      ...Vuex.mapGetters({
        processing: 'searchStore/getProcessing',
      }),
      loading_style() {
        return `display: ${this.processing ? 'block' : 'none'}`;
      },
    },
  });

})();
