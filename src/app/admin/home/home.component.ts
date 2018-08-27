import { ConsentService } from './../../services/consent.service';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { JwtHelper } from 'angular2-jwt';

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
  // perPage = 20;
  openLoading = false;
  waiting = [];
  selected = [];
  hcode: any;
  vaccines = [];
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
    private consentService: ConsentService,
    private alertService: AlertService
  ) {
    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);
    this.hcode = decoded.hospcode;
  }

  ngOnInit() {
    this.getDetail('waiting');
    // this.getVaccine('wait');
  }

  changeStatus(status) {
    this.getDetail(status);
  }

  // changeStatusVaccine(status) {
  //   this.getVaccine(status);
  // }


  async getDetail(status) {
    try {
      this.openLoading = true;
      const rs: any = await this.homeService.getRequestService(status, this.hcode);
      if (rs.ok) {
        this.waiting = rs.rows;
        console.log(this.waiting);

        // for (const v of this.waiting) {
        // const rsC = await this.consentService.getConsent(v.cid);
        // v.consent = rsC.ok;
        // }
      }
      this.openLoading = false;
    } catch (error) {
      //console.log(error);
      this.openLoading = false;
    }
  }

  // async getVaccine(status) {
  //   try {
  //     this.openLoading = true;
  //     const rs: any = await this.homeService.getRequestVaccine(status, this.hcode);
  //     // console.log(rs);
  //     if (rs.ok) {
  //       this.vaccines = rs.rows;
  //       for (const v of this.vaccines) {
  //         const rsC = await this.consentService.getConsent(v.cid);
  //         v.consent = rsC.ok;
  //       }
  //       // console.log(this.waiting);

  //     }
  //     this.openLoading = false;
  //   } catch (error) {
  //     this.openLoading = false;
  //   }
  // }

  approve(w) {
    this.alertService.confirm('คุณต้องการที่จะอนุมัติ ใช่หรือไม่!')
      .then(async (result) => {
        if (result.value) {
          const rs: any = await this.homeService.getService(w.hn, w.date_serv, w.request_id, w.uid);
          console.log(rs);
          if (rs.ok) {
            const rsS: any = await this.homeService.sendService(rs.rows);
          } else {
            await this.homeService.noData(w.request_id);
          }
          this.getDetail('waiting');
        } else {
          console.log('exit');
        }
      });
  }

  disApprove(w) {
    this.alertService.confirm('คุณต้องการที่จะไม่อนุมัติ ใช่หรือไม่')
      .then(async (result) => {
        if (result.value) {
          console.log(w.request_id);

          const rs: any = await this.homeService.disApprove(w.request_id);
          console.log(rs);
          this.getDetail('waiting');
        } else {
          console.log('exit');
        }
      });
  }

  approveMulti() {
    this.alertService.confirm(`คุณต้องการที่จะอนุมัติ ${this.selected.length} รายการ ใช่หรือไม่!`)
      .then(async (result) => {
        if (result.value) {
          for (const w of this.selected) {
            const rs: any = await this.homeService.getService(w.hn, w.date_serv, w.request_id, w.uid);
            if (rs.ok) {
              console.log(rs.rows);
              const rsS: any = await this.homeService.sendService(rs.rows);
              console.log(rsS);
            } else {
              await this.homeService.noData(w.request_id);
            }
          }
          this.getDetail('waiting');
        } else {
          this.alertService.error(`ข้อมูลที่ส่ง ${this.selected.length} รายการ ไม่สามารถบันทึกได้ กรุณาตรวจสอบ้อมูล`)
          console.log('exit');
        }
      });
  }

  disApproveMulti() {
    this.alertService.confirm(`คุณต้องการที่จะไม่อนุมัติ ${this.selected.length} รายการ ใช่หรือไม่`)
      .then(async (result) => {
        if (result.value) {
          for (const w of this.selected) {
            const rs: any = await this.homeService.disApprove(w.request_id);
          }
          this.getDetail('waiting');
        } else {
          console.log('exit');
        }
      });
  }
  // #################### vaccine
  // approveVaccine(w) {
  //   this.alertService.confirm('คุณต้องการที่จะอนุมัติ ใช่หรือไม่!')
  //     .then(async (result) => {
  //       if (result.value) {
  //         const rs: any = await this.homeService.getVaccine(w.hn, w.request_id);
  //         if (rs.ok) {
  //           const data = rs.rows;
  //           const rsS: any = await this.homeService.sendVaccine(data);
  //           if (rsS.ok) {
  //             this.getVaccine('wait');
  //           }
  //         }
  //       } else {
  //         console.log('exit');
  //       }
  //     });
  // }

  // disApproveVaccine(w) {
  //   this.alertService.confirm('คุณต้องการที่จะไม่อนุมัติ ใช่หรือไม่')
  //     .then(async (result) => {
  //       if (result.value) {
  //         const rs: any = await this.homeService.disApproveVaccine(w.request_id);
  //         this.getVaccine('wait');
  //       } else {
  //         console.log('exit');
  //       }
  //     });
  // }

  // approveMultiVaccine() {
  //   this.alertService.confirm(`คุณต้องการที่จะอนุมัติ ${this.selected.length} รายการ ใช่หรือไม่!`)
  //     .then(async (result) => {
  //       if (result.value) {
  //         for (const w of this.selected) {
  //           const rs: any = await this.homeService.getVaccine(w.hn, w.request_id);
  //           if (rs.ok) {
  //             const rsS: any = await this.homeService.sendVaccine(rs.rows);
  //           }
  //         }
  //         this.getVaccine('wait');
  //       } else {
  //         console.log('exit');
  //       }
  //     });
  // }

  // disApproveMultiVaccine() {
  //   this.alertService.confirm(`คุณต้องการที่จะไม่อนุมัติ ${this.selected.length} รายการ ใช่หรือไม่`)
  //     .then(async (result) => {
  //       if (result.value) {
  //         for (const w of this.selected) {
  //           const rs: any = await this.homeService.disApproveVaccine(w.request_id);
  //         }
  //         this.getVaccine('wait');
  //       } else {
  //         console.log('exit');
  //       }
  //     });
  // }
}
