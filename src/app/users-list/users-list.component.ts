import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injectable,
} from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { createUser, User } from './user-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/user.actions';
import { selectUsers } from './store/users.selectors';

@Injectable()
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    UserCardComponent,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  
  // readonly usersApiService = inject(UsersApiService);

  readonly dialog = inject(MatDialog);

  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe((result: createUser) => {
      this.createUser(result);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.load())
  
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  editUser(user: User) {
    this.store.dispatch(UsersActions.edit({ users: user }));
  }

  public createUser(formData: createUser) {
    this.store.dispatch(UsersActions.create({ users: formData }));
  }
  
}
