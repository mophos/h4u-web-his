import { AlertService } from './../../services/alert.service';
import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  fullname: any;
  collapsed = false;
  menuManage = false;
  menuH4U = false;
  menuNrefer = false;
  menuIS = false;
  menuQueue = false;
  menuConsent = false;
  decoded: any;
  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private alertService: AlertService) {
    const token = sessionStorage.getItem('token');
    this.decoded = this.jwtHelper.decodeToken(token);

    this.fullname = this.decoded.fullname;
  }

  ngOnInit() {
    this.testenv();
    this.checkPermission();
  }
  checkPermission() {

    if (this.decoded) {
      if (this.decoded.is_admin === 'Y' || this.decoded.is_staff === 'Y') {
        this.menuManage = true;
      }
      const idx002 = _.findIndex(this.decoded.permissions, ['permission_code', '002']); {
        if (idx002 > -1) {
          this.menuH4U = true;
        }
      }
      const idx003 = _.findIndex(this.decoded.permissions, ['permission_code', '001']); {
        if (idx003 > -1) {
          this.menuConsent = true;
        }
      }
      const idx004 = _.findIndex(this.decoded.permissions, ['permission_code', '004']); {
        if (idx004 > -1) {
          this.menuNrefer = true;
        }
      }
      const idx005 = _.findIndex(this.decoded.permissions, ['permission_code', '005']); {
        if (idx005 > -1) {
          this.menuIS = true;
        }
      }
      const idx006 = _.findIndex(this.decoded.permissions, ['permission_code', '006']); {
        if (idx006 > -1) {
          this.menuQueue = true;
        }
      }
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  async testenv() {
    const rs: any = await this.serviceService.testenv();
    if (!rs.ok) {
      console.log(rs.error);
    }
  }

}
