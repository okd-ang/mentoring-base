import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../todos-interface";

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'set': props<{ todos: Todo[] }>(),
    'edit': props<{ todo: Todo} >(),
    'create': props< {todo: Todo} >(),
    'delete': props< {id: number} >(),
    'load': emptyProps(),
    'setFailure': props<{ error: any }>(),
  },
});