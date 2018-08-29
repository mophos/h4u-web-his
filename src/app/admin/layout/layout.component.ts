import { AlertService } from './../../services/alert.service';
import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  fullname: any;
  collapsed = false;

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private alertService: AlertService) {
    const token = sessionStorage.getItem('token');
    const decoded: any = this.jwtHelper.decodeToken(token);

    this.fullname = decoded.fullname;
  }

  ngOnInit() {
    this.testenv();
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
