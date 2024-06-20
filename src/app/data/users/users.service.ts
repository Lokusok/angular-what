import { Injectable } from '@angular/core';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUser[] = [];
  LSKey = 'USERS_SERVICE_STATE';

  constructor() {
    this.users = this.readParsedFromLC();
  }

  addUser(user: IUser) {
    this.users.push(user);
    this.saveCurrentToLS();
  }

  getUserById(userId: IUser['id']) {
    return this.users.find((user) => user.id === userId);
  }

  deleteUserById(userId: IUser['id']) {
    console.log('Before:', this.users);
    this.users = this.users.filter((user) => user.id !== userId);
    console.log('After:', this.users);
    this.saveCurrentToLS();
  }

  editById(userId: IUser['id'], newUser: Omit<IUser, 'id'>) {
    this.users = this.users.map((user) => {
      if (user.id === userId) return { id: userId, ...newUser };
      return user;
    });
    this.saveCurrentToLS();
  }

  saveCurrentToLS() {
    localStorage.setItem(this.LSKey, JSON.stringify(this.users));
  }

  readParsedFromLC(): IUser[] {
    const rawData = localStorage.getItem(this.LSKey);
    if (!rawData) return [];
    return JSON.parse(rawData);
  }
}
