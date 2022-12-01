import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentData = {
    message: "",
    user: { id: "" },
    pid: "",
    status: false
  }

  constructor(private route: ActivatedRoute, private _loginService: LoginService, private _commnetService: CommentService, private snack: MatSnackBar) { }
  product_id;
  ngOnInit(): void {
    this.product_id = this.route.snapshot.params['pid'];
  }
  public addCommet() {
    let id = this._loginService.getUser()['id'];
    this.commentData.user.id = id;
    this.commentData.pid = this.product_id;

    // call server
    this._commnetService.addcomment(this.commentData).subscribe(
      (data) => {
        console.log("===========", data);
        this.snack.open('Comment has added !!', '', {
          duration: 3000,
        })
        this.commentData = {
          message: "",
          user: { id: "" },
          pid: "",
          status: false
        }
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong !! Try again', '', {
          duration: 3000,
        })
      }
    )
  }

  public goBack() {
    window.history.back();
  }
}
