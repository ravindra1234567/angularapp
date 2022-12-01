import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  };

  constructor(private snack:MatSnackBar,private login: LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit() {
    console.log("login form submit ")
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('Username is required !!', '', {
        duration: 3000,
      })
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('Password is required !!', '', {
        duration: 3000,
      })
      return;
    }

    // request to service token
    this.login.generateToken(this.loginData).subscribe(
      (data) => {
        console.log("data === ",data);
        
        console.log("success")
        console.log(data['token'])
        // login...
        this.login.loginUser(data['token']);
        this.login.getCurrentUser().subscribe(
          (user) => {

            console.log("get current user === ", user);
            
            this.login.setUser(user);
            console.log(user);
            // redirect ... ADMIN: admin-dashboard
            // redirect ... NORMAL: normal-dashoard 
            if (this.login.getUserRole() == "ADMIN") {
              // admin dashboard
              // window.location.href = "/admin"
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == "NORMAL") {
              // normal user dashboard
              // window.location.href = "/user-dashboard"
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          }
        )
      },
      (error) => {
        console.log("error")
        console.log(error)
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        })

      }
    )
  }
}
