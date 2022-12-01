import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }
  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert("User is required !!");
      this.snackBar.open('Username  is required !!', '', {
        duration: 3000,
      })
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data, "Success ");
        if (data == null) {
          this.snackBar.open('This user already there !!', '', {
            duration: 3000,
          })
        } else {
          // alert("Success !!")
          this.snackBar.open('Success  !!', '', {
            duration: 3000,
          })
        }
      },
      (error) => {
        console.log(error);
        // alert("Something went wrong")
        this.snackBar.open('Something went wrong !!', '', {
          duration: 3000,
        })
      }
    )
  }
}
