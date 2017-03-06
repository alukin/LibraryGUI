import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { LibUser }        from './LibUser';
import { LibUserService } from './LibUser.service';
@Component({
  moduleId: module.id,
  selector: 'LibUser-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})

export class UserDetailComponent implements OnInit {
  libuser: LibUser;

  constructor(
    private libuserService: LibUserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.libuserService.getUser(+params['id']))
      .subscribe(libuser => this.libuser = libuser);
  }

  save(): void {
    this.libuserService.update(this.libuser)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}


