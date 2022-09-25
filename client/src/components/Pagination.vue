<template lang="pug">
.pagination
  .pagination__info-span-wrapper
    span.pagination__info-span Showing {{currentItems}} of {{todoListMeta.itemCount}} Items
  .pagination__button-wrapper
    button.pagination__button(
      @click="$emit('onPaginateItems', todoListMeta.prevPage)",
      :class="{'disabled':!todoListMeta.hasPrevPage}"
      )
      img(src="@/static/assets/arrow-left.svg")
    span |
    button.pagination__button(
      @click="$emit('onPaginateItems', todoListMeta.nextPage)",
      :class="{'disabled':!todoListMeta.hasNextPage}"
      )
      img(src="@/static/assets/arrow-right.svg")
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from '@vue/composition-api';

import { itemLimit } from '@/api';
import { TodoListMeta } from '@/interfaces';

export default defineComponent({
  name: 'Pagination',
  props: {
    todoListMeta: {
      type: Object as PropType<TodoListMeta>,
      required: true,
    },
  },
  computed: {
    currentItems(): number {
      return itemLimit < this.todoListMeta.itemCount ? itemLimit : this.todoListMeta.itemCount;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/static/scss/variables.scss';

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  color: $light-grey;
}

.pagination__info-span-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination__info-span {
  color: black;
}

.pagination__button-wrapper {
  padding: .5em 1em;
  width: 6%;
  border: $identity-border;
  border-radius: $rounded-corners-px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination__button {
  display: flex;
}
</style>
