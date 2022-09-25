export interface TodoListMeta {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    itemCount: number;
    limit: number;
    nextPage: number | null;
    offset: number;
    page: number;
    pageCount: number;
    prevPage: number | null;
}

export interface Item {
    _id: string;
    createdAt: string;
    description: string;
    done: boolean;
    updatedAt: string;
}

export interface TodoList {
    items: Item[] | [];
    meta: TodoListMeta;
}
