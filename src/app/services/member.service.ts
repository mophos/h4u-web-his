import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MemberService {

  constructor(
    @Inject('API_H4U_URL') private h4uUrl: string,
    private authHttp: AuthHttp
  ) { }

  async insertOfficer(officer: any) {
    const rs: any = await this.authHttp.post(`${this.h4uUrl}/member/register`, {
      officer: officer
    }).toPromise();
    return rs.json();
  }

  async searchOfficer(email: any) {
    const rs: any = await this.authHttp.get(`${this.h4uUrl}/member/officer?email=${email}`).toPromise();
    return rs.json();
  }

}
