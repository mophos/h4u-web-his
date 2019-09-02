import { Injectable, Inject } from '@angular/core';
import { toPromise } from 'rxjs/operator/toPromise';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
@Injectable()
export class ServiceService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: Http,
    private authHttp: AuthHttp
  ) { }

  async getService(hn, dateServe, requestId, registerId) {
    const url = `${this.apiUrl}/services/view/${requestId}/${registerId}?hn=${hn}&dateServe=${dateServe}`;
    const rs: any = await this.authHttp.get(url).toPromise();
    console.log(rs);
    return rs.json();
  }

  async testenv() {
    const url = `${this.apiUrl}/services/testenv`;
    const rs: any = await this.authHttp.get(url).toPromise();
    return rs.json();
  }
}
