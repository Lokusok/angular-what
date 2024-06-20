import { Injectable, inject } from '@angular/core';
import { IUser } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const BASE_API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);

  users: IUser[] = [];
  LSKey = 'USERS_SERVICE_STATE';

  constructor() {
    if (navigator.onLine) this.fetchUsers();
    else this.users = this.readParsedFromLS();
  }

  fetchUsers() {
    this.http.get<IUser[]>(`${BASE_API_URL}/users`).subscribe((users) => {
      this.users = users;
    });
  }

  addUser(user: IUser) {
    return this.http.post<IUser[]>(`${BASE_API_URL}/users`, user).pipe(
      map((users) => {
        this.users = users;
        this.saveCurrentToLS();
      })
    );
  }

  getUserById(userId: IUser['id']) {
    return this.http.get<IUser>(`${BASE_API_URL}/users/${userId}`);
  }

  deleteUserById(userId: IUser['id']) {
    return this.http.delete<IUser[]>(`${BASE_API_URL}/users/${userId}`).pipe(
      map((users) => {
        this.users = users;
        this.saveCurrentToLS();
      })
    );
  }

  editById(userId: IUser['id'], newUser: Omit<IUser, 'id'>) {
    return this.http.put<IUser[]>(`${BASE_API_URL}/users/${userId}`, newUser).pipe(
      map((users) => {
        this.users = users;
        this.saveCurrentToLS();
      })
    );
  }

  saveCurrentToLS() {
    localStorage.setItem(this.LSKey, JSON.stringify(this.users));
  }

  readParsedFromLS(): IUser[] {
    const rawData = localStorage.getItem(this.LSKey);
    if (!rawData) return [];
    return JSON.parse(rawData);
  }
}
