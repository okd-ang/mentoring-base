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
import { UsersService } from '../users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';

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
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe((result: createUser) => {
      this.createUser(result);
    });
  }
  
  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  editUser(user: User) {
    this.usersService.editUser(user);
  }

  public createUser(formData: createUser) {
    this.usersService.createUser(formData);
  }
}
