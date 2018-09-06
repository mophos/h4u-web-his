import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';
import { RegisterModalComponent } from '../../directives/register-modal/register-modal.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  @ViewChild('registerModal') private registerModal: RegisterModalComponent;
  username: any;
  password: any;
  errorMessage: any;
  isError = false;
  logging = false;
  register = false;
  manageUser = false;
  manageH4U = false;

  constructor(
    private loginService: LoginService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  async doLogin() {
    if (this.username && this.password) {
      this.isError = false;
      this.logging = true;
      try {
        const rs: any = await this.loginService.doLogin(this.username, this.password);
        if (rs.ok) {
          const token = rs.token;
          const decodedToken = this.jwtHelper.decodeToken(token);
          sessionStorage.setItem('token', token);
          const idx = _.findIndex(decodedToken.permissions, ['permission_code', '002']);
          if (idx > -1) {
            this.route.navigate(['admin']);
          } else if (decodedToken.is_staff === 'Y' || decodedToken.is_staff === 'Y') {
            this.route.navigate(['member/officer']);
          } else {
            this.isError = true;
            this.errorMessage = 'คุณไม่มีสิทธิการเข้าใช้งาน';
          }

        } else {
          // this.register = true;
          this.isError = true;
          this.errorMessage = rs.error;
        }
        this.logging = false;
      } catch (error) {
        this.logging = false;
        this.isError = true;
        this.errorMessage = error;
      }
    } else {
      this.isError = true;
      this.errorMessage = 'กรุณาระบุชื่อผู้ใช้งานและรหัสผ่าน';
    }
  }

  enterLogin(event: any) {
    if (event.keyCode === 13) {
      this.doLogin();
    }
  }

  doRegister() {
    this.registerModal.show();
  }

}
