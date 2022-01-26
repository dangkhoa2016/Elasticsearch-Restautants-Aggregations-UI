
(async function () {

  const loadHtml = function (file) {
    return new Promise((resolve, reject) => {
      fetch(`/${file}.html`)
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

  await loadHtml('app');
  
  var vueApp = new Vue({
    el: '#app',
    store,
    components: {
    },
    data: {
    },
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
        setPageSize: "searchStore/setPageSizeParam",
        search: "searchStore/search",
        loadFilters: "searchStore/loadFilters",
        setEndpoint: "appStore/setEndpoint",
        setShowFilter: "appStore/setShowFilter"
      }),
      setCompleted() {
        this.setShowFilter(true);

        //clear window variables to make app secure
        // window.app = null;
        window.store = null;

        // console.log('start search');
        this.search();
      }
    },
    computed: {
      ...Vuex.mapGetters({
        processing: 'searchStore/getProcessing'
      }),
    }
  });

  window.app = vueApp;

})();
