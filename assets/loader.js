
(async function () {

  const { loadModule } = window['vue2-sfc-loader'];
  let app = {};
  
  const options = {
    moduleCache: {
      vue: Vue,
    },
    async getFile(url) {
      const res = await fetch(url);
      if (!res.ok)
        throw Object.assign(new Error(url + ' ' + res.statusText), { res });
      return await res.text();
    },
    addStyle() { /* unused here */ },
  };
  
  const loadStore = function (file) {
    return loadJs(`/stores/${file}.js`);
  };
  const loadJsComponent = function (file) {
    return loadJs(`/components/${file}.js`);
  };
  const loadJs = function (file) {
    return new Promise((resolve, reject) => {
      // console.log(`loading file: ${file}`);
      fetch(file)
        .then(res => res.text())
        .then(js => {
          eval(js);
          resolve();
        }).catch(ex => console.log(ex));
    });
  };

  const loadVueComponent = async function (file) {
    Vue.component('vue-ctk-date-time-picker', window['vue-ctk-date-time-picker']);

    var components = ['filter-card', 'search-result', 'left-panel', 'right-panel',
      'multiple-checkbox-filter', 'has-or-missing-filter', 'boolean-radio-filter',
      'date-range-filter', 'search-top', 'restaurant-modal'
    ];

    await Promise.all(components.map(async (name) => {
      Vue.component(name, await loadModule(`/vue/${name}.vue`, options));
    }));
  };

  new Vue({
    el: '#loader',
    data: {
      variants: {
        'secondary': { action: 'loadStore', status: 0, title: 'Loading vuex store' },
        'success': { action: 'loadVueComponent', status: 0, title: 'Loading vue components' },
        'danger': { action: 'initApp', status: 0, title: 'Initing app' },
        'info': { action: 'loadFilters', status: 0, title: 'Loading filters left sidebar' },
        'warning': { action: '', status: 0, title: 'All done, now start' }
      },
      current: '',
      completed: false
    },
    computed: {
      currentAction() {
        if (!this.current)
          return 'Done';
        return this.current === 'start' ? 'App loading...' : this.variants[this.current].title;
      },
    },
    methods: {
      async setCompleted() {
        this.completed = true;

        await this.sleep(1000);
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
        window.app.setCompleted();
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      async loadStore() {
        await Promise.all([
          loadStore('appStore'),
          loadStore('searchStore'),
          loadStore('displayStore'),
        ]);
      },
      async loadVueComponent() {
        await loadJs('/assets/helpers.js');
        await Promise.all([
          loadJsComponent('restaurant-card'),
        ]);
        await loadVueComponent();
      },
      initApp() {
        return new Promise(async (resolve) => {
          await loadJs('/assets/app.js');
          const intervalId = setInterval(() => {
            if (typeof window.app.loadFilters === 'function') {
              clearInterval(intervalId);
              resolve();
            }
          }, 500);
        });
      },
      async loadFilters() {
        // console.log('window.app', window.app);
        await window.app.loadFilters();
      }
    },
    async created() {
      this.current = 'start';
      await this.sleep(1000);

      for (var key in this.variants) {
        this.current = key;
        if (this.variants[key].action) {
          await this[this.variants[key].action]();
          // await this.sleep(2000);
          this.variants[key].status = 20;
          this.current = '';
          await this.sleep(1000);
          // console.log('done', key);
        }
        else {
          this.variants[key].status = 20;
          await this.sleep(1000);
          console.log('Loader all done');
        }
      }

      // await this.sleep(1000);
      await this.setCompleted();
    }
  });

})();
