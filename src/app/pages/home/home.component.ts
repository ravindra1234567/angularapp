import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = 0;
  products = 0;
  comments = 0;
  constructor(private _product: ProductService,private _commentService:CommentService, private _user: UserService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._product.count().subscribe(
      (data: any) => {
        this.products = data
      },
      (error) => {
        this._snack.open('Something went wrong !! Try again', '', {
          duration: 3000,
        })
      }
    )

    this._user.count().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        this._snack.open('Something went wrong !! Try again', '', {
          duration: 3000,
        })
      }
    )

    this._commentService.count().subscribe(
      (data: any) => {
        this.comments = data;
      },
      (error) => {
        this._snack.open('Something went wrong !! Try again', '', {
          duration: 3000,
        })
      }
    )
  }

}
