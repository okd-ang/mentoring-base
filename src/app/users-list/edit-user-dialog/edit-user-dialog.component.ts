import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { User } from '../user-interface';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormField,
    MatButtonModule,
    MatDialogClose,
  ],
})
export class EditUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    id: new FormControl(this.data.user.id, [
      Validators.required,
      Validators.minLength(1),
    ]),
    name: new FormControl(this.data.user.name, [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl(this.data.user.email, [
      Validators.required,
      Validators.email,
    ]),
    website: new FormControl(this.data.user.website, [
      Validators.required,
      Validators.minLength(3),
    ]),
    company: new FormGroup({
      name: new FormControl(this.data.user.company.name, [
        Validators.required,
        Validators.minLength(2),
      ]),
    }),
  });

  get userWithUpdatedFields() {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }
}
