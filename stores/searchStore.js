(function () {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const state = {
    queries: {},
    sorts: {},
    processing: false,
    results: [],
    filters: [],
    resetFilterFlag: false,
    index: 'restaurants2',
    pageSize: 0,
    from: 0
  };

  const mutations = {
    SET_SEARCH_PARAM(state, payload) {
      state.from = 0;
      state.queries = Object.assign({}, state.queries, payload);
    },
    SET_PAGE_SIZE(state, payload) {
      state.pageSize = payload;
    },
    SET_SORT_PARAM(state, payload) {
      state.sorts = Object.assign({}, state.sorts, payload);
    },
    SET_FROM_PARAM(state, payload) {
      state.from = state.pageSize * (payload - 1);
    },
    SET_FILTERS(state, payload) {
      state.filters = payload;
    },
    SET_SEARCH_RESULT(state, payload) {
      state.results = payload;
    },
    TOGGLE_PROCESSING(state, payload) {
      state.processing = payload;
    },
    TOGGLE_RESET_FILTER_FLAG(state) {
      state.resetFilterFlag = !state.resetFilterFlag;
      state.queries = {};
    },
  };

  const actions = {
    setSearchParam(context, payload) {
      const { commit } = context;
      commit("SET_SEARCH_PARAM", payload);
    },
    setPageSizeParam(context, payload) {
      const { commit } = context;
      commit("SET_PAGE_SIZE", payload);
    },
    setSortParams(context, payload) {
      const { commit } = context;
      commit("SET_SORT_PARAM", payload);
    },
    setFromParam(context, payload) {
      const { commit } = context;
      commit("SET_FROM_PARAM", payload);
    },
    loadFilters(context) {
      var { commit, state: { index }, rootState: { appStore: { endpoint } } } = context;
      return new Promise(async (resolve) => {
        await sleep(5000);

        fetch(`${endpoint}/filters?index=${index}`)
          .then(res => res.json())
          .then(json => {
            commit("SET_FILTERS", json);
            resolve();
          }).catch(ex => {
            console.log('Error load filters', ex);
            resolve();
          });
      });
    },
    search(context) {
      var { commit, state: { queries, sorts, from, index, pageSize: size }, rootState: { appStore: { endpoint } } } = context;
      // console.log('queries', JSON.stringify(queries, null, 2));
      // console.log('sorts', JSON.stringify(sorts, null, 2));
      // console.log('from', from, 'size', size);

      return new Promise((resolve) => {
        commit("TOGGLE_PROCESSING", true);

        fetch(`${endpoint}/search`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ queries, sorts, from, size, index })
        })
          .then(res => res.json())
          .then(json => {
            commit('SET_SEARCH_RESULT', json);
            commit("TOGGLE_PROCESSING", false);
            resolve();
          }).catch(ex => {
            console.log('Error fetch', ex);
            commit("TOGGLE_PROCESSING", false);
            resolve();
          });

        /*
        fetch(`/sample.json`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
          .then(json => {
            commit('SET_SEARCH_RESULT', json);
            commit("TOGGLE_PROCESSING", false);
            resolve();
          }).catch(ex => {
            console.log('Error fetch', ex);
            commit("TOGGLE_PROCESSING", false);
            resolve();
          });
        */
      });
    },
    toggleProcessing(context, payload) {
      const { commit } = context;
      commit("TOGGLE_PROCESSING", payload);
    },
    toggleResetFilterFlag(context, payload) {
      const { commit } = context;
      commit("TOGGLE_RESET_FILTER_FLAG", payload);
    },
  };

  const getters = {
    getSearchParams: (state) => state.queries,
    getSortParams: (state) => state.sorts,
    getProcessing: (state) => state.processing,
    getFilters: (state) => state.filters,
    getSearchResults: (state) => state.results,
    getResetFilterFlag: (state) => state.resetFilterFlag,
    getPageSize: (state) => state.pageSize,
    getFrom: (state) => state.from,
  };

  if (!window['store'])
    window['store'] = {};
  window['store']['searchStore'] = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
})();