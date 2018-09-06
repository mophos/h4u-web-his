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
      const idx = _.findIndex(this.decoded.permissions, ['permission_code', '002']); {
        if (idx > -1) {
          this.menuH4U = true;
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
    if (rs.ok) {
      console.log(rs.rows);
    } else {
      console.log(rs.error);

    }
  }

}
