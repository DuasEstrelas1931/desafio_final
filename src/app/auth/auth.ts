import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'champions_users';
  private readonly CURRENT_USER_KEY = 'current_champion';

  constructor() { }

 register(user: any): boolean {
  const users = this.getUsers();

  // Verifica duplicatas por username ou email
  if (users.find(u => u.username === user.username || u.email === user.email)) {
    return false;
  }

  users.push(user);
  localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  return true;
}

login(username: string, password: string): boolean {
  const users = this.getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    return true;
  }
  return false;
}


  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.CURRENT_USER_KEY);
  }

  private getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }
}
