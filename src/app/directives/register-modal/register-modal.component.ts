import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import { AlertService } from '../../services/alert.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styles: []
})
export class RegisterModalComponent implements OnInit {

  jwtHelper: JwtHelper = new JwtHelper();
  @ViewChild('loading') private loading: LoadingModalComponent;
  profile: any = {};
  opened = false;

  constructor(
    private alertService: AlertService,
    private memberService: MemberService
  ) { }

  ngOnInit() { }

  async saveOfficer() {
    try {
      this.loading.show();
      const rs: any = await this.memberService.insertOfficer(this.profile);
      if (rs.ok) {
        this.searchOfficer();
        this.alertService.success();
        this.hide();
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.serverError();
    } finally {
      this.loading.hide();
    }
  }

  clickSave() {
    this.saveOfficer();
  }

  async searchOfficer() {
    try {
      this.loading.show();
      const rs: any = await this.memberService.searchOfficer(this.profile.email);
      if (rs.ok) {
        this.profile.isMember = rs.rows[0].status;
        this.profile.status = rs.rows[0].status;
        this.profile.role = rs.rows[0].is_admin === 'Y' ? 'ADMIN' : rs.rows[0].is_staff === 'Y' ? 'STAFF' : 'MEMBER';
      } else {
        this.profile.isMember = null;
      }
    } catch (error) {
      this.alertService.serverError();
    } finally {
      this.loading.hide();
    }
  }

  show() {
    const decoded: any = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.profile.isMember = decoded.is_member;
    this.profile.fullName = decoded.fullname;
    this.profile.email = decoded.email;
    this.profile.jobPosition = decoded.job_position;
    this.profile.providerCode = decoded.hospcode;
    this.profile.providerName = decoded.providerName;
    this.profile.status = decoded.status;
    this.profile.role = decoded.is_admin === 'Y' ? 'ADMIN' : decoded.is_staff === 'Y' ? 'STAFF' : 'MEMBER';
    this.profile.permissions = decoded.permissions;
    this.searchOfficer();
    this.opened = true;
  }

  hide() {
    this.opened = false;
  }

}
