import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-admin-view-comment',
  templateUrl: './admin-view-comment.component.html',
  styleUrls: ['./admin-view-comment.component.css']
})
export class AdminViewCommentComponent implements OnInit {

  comments;

  commentData = {
    cid: "",
    message: "",
    user: { id: "" },
    pid: "",
    status: false,
  }

  constructor(private _commentService: CommentService, private route: ActivatedRoute, private snack: MatSnackBar) { }
  pid
  ngOnInit(): void {

    this.pid = this.route.snapshot.params['pid'];
    // alert(this.pid)

    // call server
    this._commentService.getCommentsByProductId(this.pid).subscribe(
      (data: any) => {
        this.comments = data;
        console.log("this.comments ===========", this.comments);
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong !! Try again', '', {
          duration: 3000,
        })
      }
    )
  }

  public approved(status, cid, message, pid, uid) {
    // call server
    this.commentData.status = status === true ? false : true;
    this.commentData.cid = cid;
    this.commentData.message = message;
    this.commentData.pid = pid;
    this.commentData.user.id = uid;

    console.log("commentData   === ", this.commentData);

    this._commentService.updatecomment(this.commentData).subscribe(
      (data: any) => {
        // this.comments = data;
        // console.log("this.comments ===========", this.comments);
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong !! Try again', '', {
          duration: 3000,
        })
      }
    )
  }
}
