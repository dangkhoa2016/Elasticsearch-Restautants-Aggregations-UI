Vue.component('button-counted', {
  props: {
    variant: {
      type: String,
      default: 'info'
    },
  },
  created() {
    // console.log('button', this.$store.state.buttonStore);
    this.setVariant(this.variant);
  },
  methods: {
    ...Vuex.mapActions({
      setVariant: "buttonStore/setVariant"
    })
  },
  computed: {
    ...Vuex.mapGetters({
      getCountByVariant: 'buttonStore/getCountByVariant'
    }),
    ...Vuex.mapState('buttonStore', {
      count() {
        return this.getCountByVariant(this.variant) || 0
      }
    }),
  },
  template: `<b-button tag="span" size="sm" :variant="variant">{{variant}} {{ count }}</b-button>`
});
