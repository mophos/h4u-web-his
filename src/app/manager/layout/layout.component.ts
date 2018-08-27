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
  collapsed: boolean = false;

  constructor(private router: Router) {
    let token = sessionStorage.getItem('token');
    let decoded: any = this.jwtHelper.decodeToken(token);

    this.fullname = decoded.fullname;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
