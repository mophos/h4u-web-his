import { Injectable, Inject } from '@angular/core';
// import { toPromise } from 'rxjs/operator/toPromise';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class HomeService {
  public jwtHelper: JwtHelper = new JwtHelper();
  hcode: any;
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp,
    private http: Http
  ) {
    const token = sessionStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    // const accessRight = decodedToken.accessRight;
    this.hcode = decodedToken.hospcode;
  }


  async getRequestService(status = 'all', hcode) {
    const rs: any = await this.authHttp.get(`${this.apiUrl}/requests?status=${status}`).toPromise();
    return rs.json();
  }


  async getService(hn, dateServ, requestId, registerId) {
    const url = `${this.apiUrl}/services/view/${requestId}/${registerId}?hn=${hn}&dateServ=${dateServ}`;
    const rs: any = await this.authHttp.get(url).toPromise();
    return rs.json();
  }


  async sendService(data) {
    const url = `${this.apiUrl}/services`;
    const rs: any = await this.authHttp.post(url, { services: data }).toPromise();
    return rs.json();
  }

  async noData(requestId) {
    const url = `${this.apiUrl}/requests/nodata`;
    const rs: any = await this.authHttp.post(url, { requestId: requestId }).toPromise();
    return rs.json();
  }


  async disApprove(requestId) {
    const url = `${this.apiUrl}/requests/cancel`;
    const rs: any = await this.authHttp.post(url, { requestId: requestId }).toPromise();
    return rs.json();
  }

}
