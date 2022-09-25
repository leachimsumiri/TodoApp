<template lang="pug">
  #app
    TodosView
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import TodosView from '@/views/TodosView.vue';

export default defineComponent({
  name: 'App',
  components: {
    TodosView,
  },
});
</script>

<style lang="scss">
@import '@/static/scss/main.scss';
</style>
