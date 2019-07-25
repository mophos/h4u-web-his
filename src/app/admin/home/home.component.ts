import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { JwtHelper } from 'angular2-jwt';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  // registeredUsers: any = [];
  // unRegisteredUsers: any = [];
  // total = 0;
  perPage = 20;
  openLoading = false;
  waiting = [];
  selected = [];
  hcode: any;
  vaccines = [];
  status = 'waiting';
  // openRegister = false;

  // cid: any;
  // mophid: any;
  // firstName: any;
  // lastName: any;

  // isLoading = false;
  // isValidated = false;
  // isActive = true;
  // isSaving = true;
  // isError = true;
  // errorMessage: any;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService
  ) {
    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.hcode = decoded.hospcode;
  }

  ngOnInit() {
    this.getDetail(this.status);
  }

  changeStatus(status) {
    this.status = status;
    this.getDetail(status);
  }

  async getDetail(status) {
    try {
      this.openLoading = true;
      const rs: any = await this.homeService.getRequestService(status, this.hcode);
      if (rs.ok) {
        this.waiting = rs.rows;
        this.openLoading = false;
      } else {
        this.openLoading = false;
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.openLoading = false;
      this.alertService.error(error);
    }
  }

  approve(w) {
    this.alertService.confirm('คุณต้องการที่จะอนุมัติ ใช่หรือไม่!')
      .then(async (result) => {
        this.openLoading = true;
        if (result.value) {
          const _dateServ = moment(w.date_serv).format('YYYY-MM-DD');
          const rs: any = await this.homeService.getService(w.hn, _dateServ, w.request_id, w.uid);
          if (rs.ok) {
            await this.homeService.sendService(rs.rows);
          } else {
            await this.homeService.noData(w.request_id);
          }
          this.getDetail('waiting');
          this.openLoading = false;
        } else {
          this.openLoading = false;
          console.log('exit');
        }
      }).catch(error => {
        this.openLoading = false;
        this.alertService.error(error);
      });
  }

  disApprove(w) {
    this.alertService.confirm('คุณต้องการที่จะไม่อนุมัติ ใช่หรือไม่')
      .then(async (result) => {
        this.openLoading = true;
        if (result.value) {
          await this.homeService.disApprove(w.request_id);
          this.getDetail('waiting');
          this.openLoading = false;
        } else {
          console.log('exit');
          this.openLoading = false;
        }
      }).catch(error => {
        this.openLoading = false;
        this.alertService.error(error);
      });
  }

  approveMulti() {
    this.alertService.confirm(`คุณต้องการที่จะอนุมัติ ${this.selected.length} รายการ ใช่หรือไม่!`)
      .then(async (result) => {
        this.openLoading = true;
        if (result.value) {
          for (const w of this.selected) {
            const _dateServ = moment(w.date_serv).format('YYYY-MM-DD');
            const rs: any = await this.homeService.getService(w.hn, _dateServ, w.request_id, w.uid);
            if (rs.ok) {
              await this.homeService.sendService(rs.rows);
            } else {
              await this.homeService.noData(w.request_id);
            }
          }
          this.getDetail('waiting');
          this.openLoading = false;
        } else {
          this.openLoading = false;
          console.log('exit');
        }
      }).catch(error => {
        this.openLoading = false;
        this.alertService.error(error);
      });
  }

  disApproveMulti() {
    this.alertService.confirm(`คุณต้องการที่จะไม่อนุมัติ ${this.selected.length} รายการ ใช่หรือไม่`)
      .then(async (result) => {
        this.openLoading = true;
        if (result.value) {
          for (const w of this.selected) {
            await this.homeService.disApprove(w.request_id);
          }
          this.getDetail('waiting');
          this.openLoading = false;
        } else {
          this.openLoading = false;
          console.log('exit');
        }
      }).catch(error => {
        this.openLoading = false;
        this.alertService.error(error);
      });
  }
}
