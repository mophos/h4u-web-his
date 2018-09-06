import { Injectable, Inject } from '@angular/core';
import { toPromise } from 'rxjs/operator/toPromise';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: Http
  ) { }

  async doLogin(username: any, password: any) {
    const rs: any = await this.http.post(`${this.apiUrl}/login`, {
      username: username,
      password: password
    }).toPromise();
    return rs.json();
  }

}
