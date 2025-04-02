import { Injectable } from '@angular/core';
import { Todo } from './todos-list/todos-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]) {
    this.todosSubject$.next(todos.slice(0, 10));
  }

  editTodo(editedTodo: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((todo) => {
        return todo.id === editedTodo.id ? editedTodo : todo;
      })
    );
  }

  createTodo(todo: Todo) {
    const existingTodo = this.todosSubject$.value.find(
      (currentElement: Todo) => currentElement.userId === todo.userId
    );
    if (existingTodo !== undefined) {
      alert('Такая Задача уже есть');
    } else {
      this.todosSubject$.next([...this.todosSubject$.value, todo]);
      alert('Новая Задача создана');
    }
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((item) => {
        return id === item.id ? false : true;
      })
    );
  }
}
