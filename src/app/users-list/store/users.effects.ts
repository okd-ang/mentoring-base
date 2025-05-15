import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersApiService } from "../../users-api.service";
import { catchError, of, switchMap, map } from "rxjs";
import { UsersActions } from "./user.actions";

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersApiService = inject(UsersApiService)
  
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        this.usersApiService.getUsers({ limit: 10 }).pipe(
          map(users => UsersActions.set({ users })),
          catchError(error => of(UsersActions.setFailure({ error })))
        )
      )
    )
  )
};