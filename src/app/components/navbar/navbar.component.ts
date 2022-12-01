import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  constructor(public _loging:LoginService,private router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this._loging.isLoggedIn();
    this.user = this._loging.getUser();
    this._loging.loginStatusSubject.asObservable().subscribe(
      (data) => {
        this.isLoggedIn = this._loging.isLoggedIn();
        this.user = this._loging.getUser();
      }
    )
  }

  public logout() {
    this._loging.logout();
    window.location.href = "";
  }
}
