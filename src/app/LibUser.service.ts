import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LibUser } from './LibUser';

@Injectable()
export class LibUserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'users';  // URL to web api
  
  constructor(private http: Http) { }    
  
  getUsers(): Promise<LibUser[]> {
    const url = `${this.usersUrl}/all`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as LibUser[])
               .catch(this.handleError);
  }


  getUser(id: number): Promise<LibUser> {
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


