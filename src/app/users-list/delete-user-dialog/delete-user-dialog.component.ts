import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { User } from '../user-interface';
import { MatButtonModule } from '@angular/material/button';
import { WhiteDirective } from '../../directives/white.directive';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, WhiteDirective],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss',
})
export class DeleteUserDialogComponent {
  public readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

  readonly dialog = inject(MatDialog);
}
