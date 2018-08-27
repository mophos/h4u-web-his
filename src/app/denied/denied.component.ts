import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styles: []
})
export class DeniedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
