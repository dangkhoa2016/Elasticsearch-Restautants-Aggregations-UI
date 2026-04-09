(function () {

  const state = {
    endpoint: 'https://obscure-space-couscous-49qrvqxx5g279x7-3000.app.github.dev',
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
