import { Injectable } from '@angular/core';
import { User } from './users-list/user-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable() ;

  setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  editUser(editeUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user) => {
        return user.id === editeUser.id ? editeUser : user
      })
    );
  }

  createUser(user: User) {
    this.usersSubject$.next([...this.usersSubject$.value, user]);
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item) => {
        return id === item.id ? false : true;
      })
    );
  }
}
