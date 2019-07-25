import { AlertService } from './../../../services/alert.service';
import { ServiceService } from './../../../services/service.service';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.component.html',
  styles: []
})
export class DetailRequestComponent implements OnInit {

  // detail = [{ hn: '40701', name: { title_name: 'test', first_name: 'test', last_name: 'test' }, date_serv: '123', cid: '123' }];
  detail: any = {};
  profile: any = {};
  @Input() details: any;
  hcode: any = '';
  hn: any = '';
  dateServe: any = '';
  firstName: any = '';
  lastName: any = '';
  requestId: any = '';
  uid: any = '';
  cid: any = '';

  _titleName: any;
  _firstName: any;
  _lastName: any;
  _hn: any;
  _cid: any;
  openLoading = false;
  constructor(
    private serviceService: ServiceService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.getDetail();
    this.getService();
  }

  getDetail() {
    this.dateServe = this.details.date_serv;
    this.hn = this.details.hn;
    this.hcode = this.details.hcode;
    this.requestId = this.details.request_id;
    this.uid = this.details.uid;
    this.firstName = this.details.first_name;
    this.lastName = this.details.last_name;
    this.cid = this.details.cid;
  }

  async getService() {
    this.openLoading = true;
    try {
      const _dateServ = moment(this.dateServe).format('YYYY-MM-DD');
      const rs: any = await this.serviceService.getService(this.hn, _dateServ, this.requestId, this.uid);

      if (rs.ok) {
        this.detail = rs.rows;
        this.profile = rs.profile[0];
        this._firstName = rs.profile[0].first_name;
        this._lastName = rs.profile[0].last_name;
        this._hn = rs.profile[0].hn;
        this._cid = rs.profile[0].cid;
      } else {
        // this.alertService.error(rs.error);
      }
      this.openLoading = false;
    } catch (error) {
      this.openLoading = false;
      // this.alertService.error(error);
    }

  }
}
