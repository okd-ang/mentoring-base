import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../todos-interface';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormField,
    MatButtonModule,
    MatDialogClose,
    MatButtonToggleModule,
  ],
})
export class EditTodoDialogComponent {
  readonly data = inject<{ todo: Todo }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    title: new FormControl(this.data.todo.title, [
      Validators.required,
      Validators.minLength(2),
    ]),
    userId: new FormControl(this.data.todo.userId, [Validators.required]),
    id: new FormControl(this.data.todo.id),
    completed: new FormControl(this.data.todo.completed, [Validators.required]),
  });

  get todoWithUpdatedFields() {
    return this.form.value;
  }
}
