import { Ref } from '@vue/composition-api';
import axios from 'axios';

import { Item, TodoList } from '@/interfaces';

export const apiUrl = 'http://localhost:3000/api/v1/todo';
// arbitrarily chosen to simplify testing and showcasing
export const itemLimit = 5;

export async function loadTodoItems(todoList: Ref<TodoList | null>, offset = 0, description = '') {
  await axios.get<TodoList>(`${apiUrl}?limit=${itemLimit}&offset=${offset}&description=${description}`)
    .then((response) => response.data)
    .then((data: TodoList) => {
      // eslint-disable-next-line no-param-reassign
      todoList.value = data;
    }).catch((error) => console.log(error));
}

export async function addTodoItem(desc: string) {
  await axios.post<Item>(apiUrl, { description: desc })
    .then((response) => response.data)
    .then((data: Item) => {
      console.log('successfully added item:');
      console.log(data);
    })
    .catch((error) => console.log(error));
}

export async function removeTodoItem(id: string) {
  await axios.delete(`${apiUrl}/${id}`)
    .then(() => console.log('item deleted succesfully'))
    .catch((error) => console.log(error));
}

export async function updateTodoItem(id: string, doneStatus: boolean) {
  await axios.put<Item>(`${apiUrl}/${id}`, { done: doneStatus })
    .then((response) => response.data)
    .then((data: Item) => {
      console.log('successfully updated item:');
      console.log(data);
    })
    .catch((error) => console.log(error));
}
