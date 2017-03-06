import { Component, OnInit } from '@angular/core';

import { Hero }        from './LibUser';
import { HeroService } from './LibUser.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  users: LibUser[] = [];

  constructor(private libuserService: LibUserService) { }

  ngOnInit(): void {
    this.libuserService.getUsers()
      .then(users => this.users = users.slice(1, 5));
  }
}
