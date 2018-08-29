import { Injectable, Inject } from '@angular/core';
import { toPromise } from 'rxjs/operator/toPromise';
import { Http } from '@angular/http';
@Injectable()
export class ServiceService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: Http
  ) { }

  async getService(hn, dateServe, requestId, registerId) {
    const url = `${this.apiUrl}/services/view/${hn}/${dateServe}/${requestId}/${registerId}`;
    const rs: any = await this.http.get(url).toPromise();
    console.log(rs);
    return rs.json();
  }

  async testenv() {
    const url = `${this.apiUrl}/services/testenv`;
    const rs: any = await this.http.get(url).toPromise();
    return rs.json();
  }
}
