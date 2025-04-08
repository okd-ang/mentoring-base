import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../todos-interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomTruncatePipe } from '../../pipes/truncate.pipe';
import { CustomDatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    CustomTruncatePipe,
    CustomDatePipe,
  ],
})
export class TodoCardComponent {
  @Input()
  public todo!: Todo;

  @Output()
  public deleteTodo = new EventEmitter<number>();

  @Output()
  editTodo = new EventEmitter<Todo>();

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  today = new Date();

  private showSnackBarTodo(
    message: string,
    action: string = 'OK',
    duration: number = 3000,
  ): void {
    this.snackBar.open(message, action, { duration });
  }

  public openDeleteTodoDialog(): void {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      width: '600px',
      data: { todo: this.todo },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.showSnackBarTodo('Задача удалена', 'Закрыть');
        this.deleteTodo.emit(this.todo.id);
      } else {
        this.showSnackBarTodo('Отмена удаления задачи', 'Закрыть');
      }
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });

    dialogRef.afterClosed().subscribe((editResultTodo: Todo | undefined) => {
      if (editResultTodo) {
        this.showSnackBarTodo('ОТРЕДАКТИРОВАЛИ ЗАДАЧУ', 'ЗАКРЫТЬ');
        this.editTodo.emit(editResultTodo);
      }
    });
  }
}
