import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../todos-interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true,
  imports: [MatDialogModule, MatSnackBarModule],
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

  private performAction(
    actionName: string,
    action: Function,
    duration: number = 3000
  ): void {
    action();
    this.snackBar.open(actionName, 'OK', { duration });
  }

  public openDeleteTodoDialog(): void {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      width: '600px',
      data: { todo: this.todo.id },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.performAction('ЗАДАЧА УДАЛЕНА', () => {
          this.deleteTodo.emit(this.todo.id);
        });
      } else {
        this.performAction('ОТМЕНА УДАЛЕНИЯ ЗАДАЧИ', () => {});
      }
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });

    dialogRef.afterClosed().subscribe((editResultTodo: Todo | undefined) => {
      if (editResultTodo) {
        this.performAction('ОТРЕДАКТИРОВАЛИ ЗАДАЧУ', () => {
          this.editTodo.emit(editResultTodo);
        });
      }
    });
  }
}
