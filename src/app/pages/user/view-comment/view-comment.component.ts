import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {

  comments;
pid
  constructor(private _commentService : CommentService, private snack : MatSnackBar,private route : ActivatedRoute) { }


  ngOnInit(): void {
    // call server
    this.pid = this.route.snapshot.params['pid'];
    this._commentService.getCommentsByProductId(this.pid).subscribe(
      (data:any) => {
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

}
