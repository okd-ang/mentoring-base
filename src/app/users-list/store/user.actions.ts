import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../user-interface';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    set: props<{ users: User[] }>(),
    setFailure: props<{ error: unknown }>(),
    create: props<{ users: User }>(),
    edit: props<{ users: User }>(),
    delete: props<{ id: number }>(),
    init: emptyProps(),
  },
});
