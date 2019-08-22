import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import axios from 'axios';
// const axios = require('axios');
@Injectable()
export class ConsentService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp,
    private http: HttpClient
  ) { }

  async getList(query) {
    const url = `${this.apiUrl}/consents?query=${query}`;
    const rs: any = await this.authHttp.get(url).toPromise();
    return rs.json();
  }

  async updateTel(data) {
    const url = `${this.apiUrl}/consents/tel`;
    const rs: any = await this.authHttp.put(url, data).toPromise();
    return rs.json();
  }

  async save(data) {
    const url = `${this.apiUrl}/consents`;
    const rs: any = await this.authHttp.post(url, data).toPromise();
    return rs.json();
  }

  async uploadImage(data) {
    const url = `${this.apiUrl}/consents/image`;
    const rs: any = await this.authHttp.post(url, data).toPromise();
    return rs.json();
  }

  async getImage(id, cid) {
    const url = `${this.apiUrl}/consents/image?cid=${cid}&id=${id}`;
    const rs: any = await this.authHttp.get(url).toPromise();
    return rs.json();
  }

  async getParent(id, cid) {
    const url = `${this.apiUrl}/consents/parent?cid=${cid}&id=${id}`;
    const rs: any = await this.authHttp.get(url).toPromise();
    return rs.json();
  }

  async updateParent(id, cid, parent) {
    const url = `${this.apiUrl}/consents/parent`;
    const rs: any = await this.authHttp.put(url, { id, cid, parent }).toPromise();
    return rs.json();
  }

  async getSmarthealth(cid) {
    const url = `${this.apiUrl}/consents/smarthealth?cid=${cid}`;
    const rs: any = await this.authHttp.get(url).toPromise();
    return rs.json();
  }

  async getSmartcard() {
    const smartCardReader = axios.create({
      baseURL: 'https://localhost:8443/smartcard',
      timeout: 5000,
    });

    return new Promise((resolve: any, reject: any) => {
      smartCardReader.get('/data/').then(rs => {
        resolve(rs.data);
      }).catch(e => {
        reject(e);
      });
    });
  }
}
