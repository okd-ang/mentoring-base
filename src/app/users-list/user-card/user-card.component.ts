import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../user-interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  imports: [MatDialogModule, MatSnackBarModule],
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<User>();

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  private performAction(
    actionName: string,
    action: Function,
    duration: number = 3000
  ): void {
    action();
    this.snackBar.open(actionName, 'OK', { duration });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '600px',
      data: { user: this.user.id },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.performAction('ПОЛЬЗОВАТЕЛЬ УДАЛЕН', () => {
          this.deleteUser.emit(this.user.id);
        });
      } else {
        this.performAction('ОТМЕНА УДАЛЕНИЯ', () => {});
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult: User | undefined) => {
      if (editResult) {
        this.performAction('ОТРЕДАКТИРОВАЛИ ПОЛЬЗОВАТЕЛЯ', () => {
          this.editUser.emit(editResult);
        });
      }
    });
  }
}
