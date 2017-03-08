import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { LibUser } from './LibUser';

@Injectable()
export class LibUserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:8080/users';  // URL to web api
  private token:string ='12345678';
  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }

  login(login:string, password: string){
    //TODO: implement later
    this.localStService.add('login',login);
    this.localStService.add('password',login);
    this.localStService.add('token',this.token);
  }

  getUsers(): Promise<LibUser[]> {
    const url = `${this.usersUrl}/all`;
    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response => response.json().users as LibUser[])
               .catch(this.handleError);
  }

//example of debug of promise
  getUser(id: number): Promise<LibUser> {
    const url = `${this.usersUrl}/byid/${id}`;
    return this.http.get(url,{headers: this.headers}).toPromise()
         .then(response => {
          let user: LibUser;
          console.log("JSON: "+JSON.stringify(response.json()));
          user = response.json().users[0];
          console.log("User: "+user.login)
          return Promise.resolve(user);
        })
       .catch(
        this.handleError
       );
  }

  //TODO: change below
  create(id:  string): Promise<LibUser> {
     const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as LibUser)
      .catch(this.handleError);
  }
  update(id:  string): Promise<LibUser> {
     const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as LibUser)
      .catch(this.handleError);
  }

  delete(id: number): Promise<LibUser> {
      const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as LibUser)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


