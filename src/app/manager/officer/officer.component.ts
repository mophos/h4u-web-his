import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { LoadingModalComponent } from '../../directives/loading-modal/loading-modal.component';
import { AlertService } from '../../services/alert.service';
import { StaffService } from '../../services/staff.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styles: []
})
export class OfficerComponent implements OnInit {

  jwtHelper: JwtHelper = new JwtHelper();
  @ViewChild('loading') private loading: LoadingModalComponent;

  officers: any = [];
  modalOfficer = false;
  status = false;
  query: string;
  filterStatus = 'W';

  profile: any = {};
  permissions: any = [];

  constructor(
    private staffService: StaffService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getOfficer();
  }

  async getOfficer() {
    try {
      this.loading.show();
      const rs: any = await this.staffService.getOfficer(this.query, this.filterStatus);
      if (rs.ok) {
        this.officers = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.serverError();
    } finally {
      this.loading.hide();
    }
  }

  async listPermission() {
    try {
      this.loading.show();
      const rs: any = await this.staffService.listPermission();
      if (rs.ok) {
        this.permissions = rs.rows;
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

  clickEdit(o: any) {
    this.listPermission();
    this.profile = {};
    this.profile.officerId = o.officer_id;
    this.profile.fullName = o.full_name;
    this.profile.providerCode = o.provider_code;
    this.profile.providerName = o.provider_name;
    this.profile.email = o.email;
    this.profile.jobPosition = o.job_position;
    this.profile.providerName = o.provider_name;
    this.status = o.status === 'Y' ? true : false;
    this.getPermission(this.profile.email);
    this.modalOfficer = true;
  }

  async saveOfficer() {
    try {
      let officer: any = {};
      officer = this.profile;
      officer.status = this.status === true ? 'Y' : 'N';
      officer.permissions = this.permissions;
      const rs: any = await this.staffService.updateOfficer(officer);
      if (rs.ok) {
        this.getOfficer();
        this.alertService.success();
        this.modalOfficer = false;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.serverError();
    } finally {
      this.loading.hide();
    }
  }

  enterSearch(event: any) {
    if (event.keyCode === 13) {
      this.getOfficer();
    }
  }

  changeFilterStatus() {
    this.getOfficer();
  }

  async getPermission(email: any) {
    try {
      this.loading.show();
      const rs: any = await this.staffService.getPermission(email);
      if (rs.ok) {
        _.forEach(rs.rows, (r: any) => {
          const idx = _.findIndex(this.permissions, ['permission_code', r.permission_code]);
          if (idx > -1) {
            this.permissions[idx].officer_permission_id = r.officer_permission_id;
            this.permissions[idx].checked = true;
          }
        });
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.serverError();
    } finally {
      this.loading.hide();
    }
  }

  changePermission(event: any) {
    const idx = _.findIndex(this.permissions, ['permission_code', event.target.name]);
    if (idx > -1) {
      if (event.target.checked) {
        this.permissions[idx].checked = true;
      } else {
        this.permissions[idx].checked = false;
      }
    }
  }

}
