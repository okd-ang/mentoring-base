import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injectable,
} from '@angular/core';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from './todos-interface';
import { TodosService } from '../todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TodosActions } from './store/todo.actions';
import { selectTodos } from './store/todos.selectors';

@Injectable()
@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    TodoCardComponent,
    AsyncPipe,
    CreateTodoFormComponent,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosService = inject(TodosService);

  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  ngOnInit(): void {
    this.store.dispatch(TodosActions.init());
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({ id }));
  }

  editTodo(todo: Todo) {
    this.store.dispatch(TodosActions.edit({ todo }));
  }

  public createTodo(formData: Todo) {
    this.store.dispatch(TodosActions.create({ todo: formData }));
  }
}
