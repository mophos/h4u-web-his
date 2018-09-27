import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  profile: any = {};

  constructor() { }

  ngOnInit() {
    const decoded: any = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
    this.profile.isMember = decoded.is_member;
    this.profile.fullName = decoded.fullname;
    this.profile.email = decoded.email;
    this.profile.jobPosition = decoded.job_position;
    this.profile.providerCode = decoded.provider_code;
    this.profile.providerName = decoded.provider_name;
    this.profile.status = decoded.status;
    this.profile.role = decoded.is_admin === 'Y' ? 'ADMIN' : decoded.is_staff === 'Y' ? 'STAFF' : 'MEMBER';
    this.profile.permissions = decoded.permissions;
  }

}
