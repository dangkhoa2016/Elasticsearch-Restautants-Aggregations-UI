(function () {

  const state = {
    endpoint: 'https://elasticsearch-restaurants-aggregations-api-nodejs.khoa2016.repl.co',
    showFilter: false,
  };

  const mutations = {
    SET_ENDPOINT(state, payload) {
      state.endpoint = payload;
    },
    SET_SHOW_FILTER(state, payload) {
      state.showFilter = payload;
    },
  };

  const actions = {
    setEndpoint(context, payload) {
      const { commit } = context;
      commit('SET_ENDPOINT', payload);
    },
    setShowFilter(context, payload) {
      const { commit } = context;
      commit('SET_SHOW_FILTER', payload);
    },
  };

  const getters = {
    getEndpoint: (state) => state.endpoint,
    getReady: (state) => state.ready,
    getShowFilter: (state) => state.showFilter,
  };

  if (!window['store'])
    window['store'] = {};
  window['store']['appStore'] = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };

})();
