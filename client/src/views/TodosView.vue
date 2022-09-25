<template lang="pug">
.todos-view-container
  .search-input-wrapper
    input.search-input(
      placeholder='Search',
      type='text',
      v-model="searchItemDescription",
      @keyup="loadFilteredItems(searchItemDescription)"
    )
  .todo-items-wrapper
    .todo-item__div
      input(
        placeholder='Take a note',
        type='text',
        v-model="addItemDescription",
        @keyup.enter="addTodoItem(addItemDescription), addItemDescription = ''"
        )
      button.add(@click="addTodoItem(addItemDescription), addItemDescription = ''") +
    template(v-if="todoList && todoList.items.length")
      .todo-item-wrapper
        TodoItem.todo-item__div(
          v-for="item in todoList.items"
          :key="item._id"
          :item="item"
          @onRemoveItem="removeTodoItem($event)"
          @onUpdateItem="updateTodoItem($event)"
        )
  template(v-if="todoList && todoList.items.length")
    Pagination(
      :todoListMeta="todoList.meta"
      @onPaginateItems="loadPaginatedItems($event)"
      )
</template>

<script lang="ts">

import {
  defineComponent,
  onMounted,
  ref,
} from '@vue/composition-api';

import * as api from '@/api';
import Pagination from '@/components/Pagination.vue';
import TodoItem from '@/components/TodoItem.vue';
import { Item, TodoList } from '@/interfaces';

export default defineComponent({
  name: 'TodosView',
  components: {
    TodoItem,
    Pagination,
  },
  setup() {
    const todoList = ref<TodoList | null>(null);
    const searchItemDescription = ref<string>('');
    const addItemDescription = ref<string>('');

    async function loadPaginatedItems(page: number) {
      await api.loadTodoItems(todoList, (page - 1) * api.itemLimit);
    }

    async function loadTodoItems() {
      if (todoList.value) {
        await loadPaginatedItems(todoList.value.meta.page);
      } else {
        await api.loadTodoItems(todoList);
      }
    }

    async function addTodoItem(description: string) {
      if (description) {
        await api.addTodoItem(description);
        await loadTodoItems();
      }
    }

    async function removeTodoItem(id: string) {
      await api.removeTodoItem(id);
      await loadTodoItems();
    }

    async function updateTodoItem(item: Item) {
      await api.updateTodoItem(item._id, item.done);
    }

    async function loadFilteredItems(description: string) {
      await api.loadTodoItems(todoList, 0, description);
    }

    onMounted(() => api.loadTodoItems(todoList));
    return {
      searchItemDescription,
      addItemDescription,
      todoList,
      addTodoItem,
      removeTodoItem,
      updateTodoItem,
      loadPaginatedItems,
      loadFilteredItems,
    };
  },
});
</script>

<style lang="scss">
@import '@/static/scss/variables.scss';

.todos-view-container {
  margin-top: 5vw;
  flex: 1;
}

.search-input-wrapper {
  display: flex;
}

.search-input {
  height: 1.5em;
  width: 100%;
  padding: .5em .5em .5em 2em;
  opacity: $common-opacity;
  background: $light-grey url('../static/assets/magnifying-glass.svg') no-repeat scroll 9px 9px;
  border: none;
  border-radius: $rounded-corners-px;
}

.todo-items-wrapper {
  margin-top: 1em;
}

.todo-items-wrapper > .todo-item__div {
  &:first-of-type {
    border-radius: $semi-rounded-corners-px $semi-rounded-corners-px 0 0;
  }

  &:last-of-type {
    &:first-of-type {
      border-radius: $semi-rounded-corners-px;
    }
  }
}

.todo-item__div {
  height: 3em;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border: $identity-border;
}

.todo-item__div input[type="text"] {
  border: none;
  background: transparent;
  opacity: $common-opacity;
  flex: 1;
}

.todo-item__div {
  &:last-of-type {
    border-radius: 0 0 $semi-rounded-corners-px $semi-rounded-corners-px;
  }
}

.add {
  font-size: 25px;
}

.todo-item-wrapper {
  display: flex;
  flex-direction: column;
}

.todo-item-wrapper > div {
  border-top: none;

  &:last-of-type {
      border-radius: 0 0 $semi-rounded-corners-px $semi-rounded-corners-px;
  }
}
</style>
