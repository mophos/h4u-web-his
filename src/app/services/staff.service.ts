import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class StaffService {

  constructor(
    @Inject('API_H4U_URL') private h4uUrl: string,
    private authHttp: AuthHttp
  ) { }

  async getOfficer(query: any, status: any) {
    const rs: any = await this.authHttp.get(`${this.h4uUrl}/staff/officers?query=${query}&status=${status}`).toPromise();
    return rs.json();
  }

  async updateOfficer(officer: any) {
    const rs: any = await this.authHttp.put(`${this.h4uUrl}/staff/officers`, {
      officer: officer
    }).toPromise();
    return rs.json();
  }

  async getPermission(email: any) {
    const rs: any = await this.authHttp.get(`${this.h4uUrl}/staff/officers/permission?email=${email}`).toPromise();
    return rs.json();
  }

  async listPermission() {
    const rs: any = await this.authHttp.get(`${this.h4uUrl}/standard/permission`).toPromise();
    return rs.json();
  }

}
