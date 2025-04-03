import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../user-interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomUpperCasePipe } from '../../pipes/upper-case.pipe';
import { CustomDatePipe } from '../../pipes/date.pipe';
import { CustomPhoneNumberPipe } from '../../pipes/phone.pipe';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  imports: [MatDialogModule, MatSnackBarModule, CustomUpperCasePipe, CustomDatePipe, CustomPhoneNumberPipe ],
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

  today = new Date()
  // phoneNumber = new PhoneNumber()

  private showSnackBarUser(message: string, action: string = 'OK', duration: number = 3000): void {
    this.snackBar.open(message, action, { duration });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '600px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.showSnackBarUser('Пользователь удален', 'Закрыть');
        this.deleteUser.emit(this.user.id);
      } else {
        this.showSnackBarUser('Отмена удаления', 'Закрыть');
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult: User | undefined) => {
      if (editResult) {
        this.showSnackBarUser('Пользователь отредактирован', 'Закрыть');
        this.editUser.emit(editResult);
      } else {
        this.showSnackBarUser('Редактирование отменено', 'Закрыть');
      }
    });
  }
}
