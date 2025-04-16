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
  createTodo = new EventEmitter();

  public form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userId: new FormControl('', [Validators.required]),
    completed: new FormControl(null, [Validators.required]),
  });

  public submitForm(): void {
    this.createTodo.emit(this.form.value);
    this.form.reset();
  }
  
}
