import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Todo } from '../todos-interface';
import { MatButtonModule } from '@angular/material/button';
import { WhiteDirective } from '../../directives/white.directive';

@Component({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, WhiteDirective],
  templateUrl: './delete-todo-dialog.component.html',
  styleUrl: './delete-todo-dialog.component.scss',
})
export class DeleteTodoDialogComponent {
  public readonly data = inject<{ todo: Todo }>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);
}
