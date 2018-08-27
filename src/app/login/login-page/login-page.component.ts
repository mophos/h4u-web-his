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
  isError: boolean = false;
  logging: boolean = false;
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
        let rs: any = await this.loginService.doLogin(this.username, this.password);
        if (rs.ok) {
          const token = rs.token;
          const decodedToken = this.jwtHelper.decodeToken(token);
          sessionStorage.setItem('token', token);
          const idx = _.findIndex(decodedToken.permissions, ['permission_code', '002']);
          const status = decodedToken.status;
          if (status === 'Y') {
            if (decodedToken.is_admin === 'Y' || decodedToken.is_staff === 'Y') {
              this.manageUser = true;
              if (idx > -1) {
                this.manageH4U = true;
              } else {
                this.route.navigate(['manager']);
              }
            } else {
              this.manageUser = false;
              if (idx > -1) {
                this.route.navigate(['admin']);
              } else {
                this.isError = true;
                this.errorMessage = 'บัญชีของคุณไม่มีสิทธิ์ใช้งาน Health for You (H4U)';
              }
            }
          } else if (status === 'N') {
            this.isError = true;
            this.errorMessage = 'บัญชีของคุณถูกระงับการใช้งาน สำหรับโครงการ Health for You (H4U)';
          } else if (status === 'W') {
            this.isError = true;
            this.errorMessage = 'กรุณารอการอนุมัติเข้าร่วมโครงการ Health for You (H4U)';
          } else {
            this.register = true;
            this.isError = true;
            this.errorMessage = 'คุณยังไม่ได้ลงทะเบียนเข้าร่วมโครงการ Health for You (H4U)';
          }
        } else {
          this.isError = true;
          this.errorMessage = rs.error;
        }

        this.logging = false;
      } catch (error) {
        this.logging = false;
        this.isError = true;
        this.errorMessage = 'เกิดข้อผิดพลาดในการเชื่อมต่อ';
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
