import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // deleteUser(user: User) {
  //   throw new Error('Method not implemented.');
  // }

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Moderator' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'User' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin' },
    { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'Moderator' },
    { id: 7, name: 'Eve Foster', email: 'eve@example.com', role: 'User' },
    { id: 8, name: 'Frank Green', email: 'frank@example.com', role: 'Admin' },
    { id: 9, name: 'Grace Harris', email: 'grace@example.com', role: 'Moderator' },
    { id: 10, name: 'Hank Irwin', email: 'hank@example.com', role: 'User' },
    { id: 11, name: 'Ivy Johnson', email: 'ivy@example.com', role: 'Admin' },
    { id: 12, name: 'Jack King', email: 'jack@example.com', role: 'Moderator' },
    { id: 13, name: 'Kelly Lee', email: 'kelly@example.com', role: 'User' },
    { id: 14, name: 'Larry Moore', email: 'larry@example.com', role: 'Admin' },
    { id: 15, name: 'Mona Nelson', email: 'mona@example.com', role: 'Moderator' },
    { id: 16, name: 'Nina Owens', email: 'nina@example.com', role: 'User' },
    { id: 17, name: 'Oscar Parker', email: 'oscar@example.com', role: 'Admin' },
    { id: 18, name: 'Pam Quinn', email: 'pam@example.com', role: 'Moderator' },
    { id: 19, name: 'Quincy Roberts', email: 'quincy@example.com', role: 'User' },
    { id: 20, name: 'Rachel Scott', email: 'rachel@example.com', role: 'Admin' },
    { id: 21, name: 'Sam Taylor', email: 'sam@example.com', role: 'Moderator' },
    { id: 22, name: 'Tina Underwood', email: 'tina@example.com', role: 'User' },
    { id: 23, name: 'Uma Vernon', email: 'uma@example.com', role: 'Admin' },
    { id: 24, name: 'Victor White', email: 'victor@example.com', role: 'Moderator' },
    { id: 25, name: 'Wendy Xu', email: 'wendy@example.com', role: 'User' },
  ];
  
  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  // deleteName(user: User): Observable<User[]> {
  //   this.users = this.users.filter(m => m !== user);
  //   return of(this.users);
  // }
}
