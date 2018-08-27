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
    // const url = `http://1.179.191.29:3000/services/view/0080811/2018-05-04/5b1e28e42e1e5900148faa22/HXFsjfSVBWMBNdPhzlWIrcDV6kA2`;
    const url = `${this.apiUrl}/services/view/${hn}/${dateServe}/${requestId}/${registerId}`;
    const rs: any = await this.http.get(url).toPromise();
    console.log(rs);

    return rs.json();
  }
}
