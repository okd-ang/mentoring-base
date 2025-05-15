import { createReducer, on } from "@ngrx/store";
import { User } from "../user-interface";
import { UsersActions } from "./user.actions";

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
    users: state.users.map((user) => {
      if (user.id === payload.users.id) {
        return payload.users;
      } else {
        return user;
      }
    }),
  })),
  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.users],
  })),
  on(UsersActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id),
  }))
);
  