import { inject, Injectable } from '@angular/core';
import { TodosApiService } from '../../todos-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TodosActions } from './todo.actions';
import { Todo } from '../todos-interface';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoApiService = inject(TodosApiService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.init),
      switchMap(() =>
        this.todoApiService.getTodos().pipe(
          map((todos: Todo[]) =>
            TodosActions.set({ todos: todos.slice(0, 10) })
          ),
          catchError((error: unknown) => of(TodosActions.setFailure({ error })))
        )
      )
    )
  );
}
