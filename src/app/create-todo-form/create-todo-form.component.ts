import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule, MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../todos-list/todos-interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-todo-form',
  standalone: true,
  templateUrl: './create-todo-form.html',
  styleUrl: './create-todo-form.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormField,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
})
export class CreateTodoFormComponent {

  @Output()
  createTodo = new EventEmitter<Todo>();

  public form = new FormGroup({
    title: new FormControl<string>('', {nonNullable: true, validators:[Validators.required, Validators.minLength(2)]}),
    userId: new FormControl<number | null>(null, {nonNullable: true, validators:Validators.required} ),
    id: new FormControl<number>(new Date().getTime(), {nonNullable: true, validators:Validators.required}),
    completed: new FormControl<boolean | null>(null, {nonNullable: true, validators:Validators.required}),
  });

  public submitForm(): void {
    const formData: Todo = this.form.getRawValue() as Todo;
    this.createTodo.emit(formData);
    this.form.reset();
  }

}
