import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injectable,
} from '@angular/core';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosApiService } from '../todos-api.service';
import { Todo } from './todos-interface';
import { TodosService } from '../todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }

  editTodo(todo: Todo) {
    this.todosService.editTodo(todo)
  }

  public createTodo(formData: Todo) {
    this.todosService.createTodo({
      id: new Date().getTime(),
      title: formData.title,
      userId: formData.userId,
      completed: formData.completed,
    });
  }
}
