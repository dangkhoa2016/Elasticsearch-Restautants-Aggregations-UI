<template>

  <b-card header-tag='header' class='mb-3' no-body footer-tag='footer'>
    <template #header>
      <div class='d-flex justify-content-between align-items-center'>
        <h6 class='mb-0'>{{ title }}</h6>
        <b-link v-b-toggle='bodyId'><i :class='arrowClass'></i></b-link>
      </div>
    </template>

    <b-collapse :id='bodyId' v-model='collapseVisible'>
      <div class='p-2'>
        <slot></slot>

        <div class='clearfix mt-2'>
          <slot name='more-button'></slot>
          <b-button size='sm' class='float-end' @click.prevent='reset'>Reset</b-button>
        </div>
      </div>
    </b-collapse>
  </b-card>

</template>

<script>
  export default {
    data() {
      return {
        collapseVisible: true,
      };
    },
    props: {
      title: {
        type: String,
        default: 'Filter',
      },
    },
    computed: {
      bodyId () {
        return `cf-${new Date().valueOf()}`;
      },
      arrowClass () {
        return this.collapseVisible ? 'bi-arrow-up-circle' : 'bi-arrow-down-circle';
      },
    },
    methods: {
      reset() {
        this.$emit('reset');
      },
    },
  }
</script>
