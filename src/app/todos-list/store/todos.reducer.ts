import { createReducer, on } from '@ngrx/store';
import { TodosActions } from './todo.actions';
import { Todo } from '../todos-interface';

const initialState: { todos: Todo[] } = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodosActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos,
  })),

  on(TodosActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo: Todo) => {
      return todo.id === payload.todo.id ? payload.todo : todo;
    }),
  })),

  on(TodosActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),

  on(TodosActions.delete, (state, payload) => ({
    ...state,
    todos: state.todos.filter((todo: Todo) => todo.id !== payload.id),
  }))
);
