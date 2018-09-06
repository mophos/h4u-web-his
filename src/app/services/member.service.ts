import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MemberService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  async insertOfficer(officer: any) {
    const rs: any = await this.authHttp.post(`${this.apiUrl}/member/register`, {
      officer: officer
    }).toPromise();
    return rs.json();
  }

  async searchOfficer(email: any) {
    const rs: any = await this.authHttp.get(`${this.apiUrl}/member/officer?email=${email}`).toPromise();
    return rs.json();
  }

}
