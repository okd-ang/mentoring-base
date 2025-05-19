import { createReducer, on } from '@ngrx/store';
import { User } from '../user-interface';
import { UsersActions } from './user.actions';

const initialState: { users: User[] } = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
  on(UsersActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user: User) => {
      return user.id === payload.users.id ? payload.users : user;
    }),
  })),
  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.users],
  })),
  on(UsersActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user: User) => user.id !== payload.id),
  }))
);
