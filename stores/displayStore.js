(function () {

  const state = {
    restaurant: null,
    colors: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
  };

  const mutations = {
    SET_RESTAURANT(state, payload) {
      state.restaurant = Object.assign({}, payload);
    },
  };

  const actions = {
    setRestaurant(context, payload) {
      const { commit } = context;
      commit('SET_RESTAURANT', payload);
    },
  };

  const getters = {
    getRestaurant: (state) => state.restaurant || {},
    getColors: (state) => state.colors || [],
    getRestaurantAddress: (state) => {
      const { address = {} } = state.restaurant || {};
      return address;
    },
    getRestaurantReviews: (state) => {
      const { statistics: { reviews = {} } = {} } = state.restaurant || {};
      return reviews;
    },
    getRestaurantPhoto: (state) => {
      const { photos: { medium } = {} } = state.restaurant || {};
      const { url = 'https://cdn-icons-png.flaticon.com/512/2533/2533563.png' } = medium || {};
      return url;
    },
  };

  if (!window['store'])
    window['store'] = {};
  window['store']['displayStore'] = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };

})();
