import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormField,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class CreateUserDialogComponent {
  private readonly dialogref = inject(MatDialogRef<CreateUserDialogComponent>);

  public form = new FormGroup({
    id: new FormControl(new Date().getTime(), [
      Validators.required,
      Validators.minLength(1),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    website: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    }),
  });

  public submitForm(): void {
    this.dialogref.close(this.form.value);
  }
}
