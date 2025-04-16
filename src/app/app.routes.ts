import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HomePageComponent } from './home/home.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'todos', component: TodosListComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
];
