import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { LibUser }        from './LibUser';
import { LibUserService } from './LibUser.service';
@Component({
  moduleId: module.id,
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})

export class UserDetailComponent implements OnInit {

  libuser: LibUser = new LibUser();
  user_id: string = "";

  constructor(
    private libuserService: LibUserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .switchMap((params: Params) => this.libuserService.getUser(+params['id']))
    //   .subscribe((user) => {
    //         this.libuser = user;
    //         this.zaraza = this.libuser.login
    //         console.log("Fuking user zaraza: "+this.zaraza);
    //   });
    this.route.params
      .subscribe((params: Params)=>{
           this.user_id = params['id'];
           console.log("PARAMS ID: " + this.user_id+"<<");
           this.libuserService.getUser(this.user_id)
             .then((user) => {
                 this.libuser = user;
               }
             )
        }
      )
  }

  save(): void {
   // this.libuserService.update(this.libuser)
   //   .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  reload():void {
    this.libuserService.getUser(this.user_id)
      .then((user) => {
          this.libuser = user;
        }
      )
  }
}


