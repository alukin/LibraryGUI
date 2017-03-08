import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { LibUser }                from './LibUser';
import { LibUserService }         from './LibUser.service';

@Component({
  moduleId: module.id,
  selector: 'lib-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {
  users: LibUser[];
  selectedUser: LibUser;

  constructor(
    private libuserService: LibUserService,
    private router: Router) { }

  getUsers(): void {
    this.libuserService
        .getUsers()
        .then(users => this.users = users);
  }

  add(name: string, email:string): void {
    name = name.trim();
    email = email.trim();
    if (!name || !email) {
      return;
    }

    let user:LibUser = new LibUser();
    user.login = name;
    user.email = email;
    user.isLibrarian=false;

    this.libuserService.create(user)
      .then(user => {
        this.users.push(user);
        this.selectedUser = null;
      });
  }

  delete(user: LibUser): void {
    this.libuserService
        .delete(user.user_id)
        .then(() => {
          this.users = this.users.filter(h => h !== user);
          if (this.selectedUser === user) { this.selectedUser = null; }
        });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: LibUser): void {
    this.selectedUser = user;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedUser.user_id]);
  }
}
