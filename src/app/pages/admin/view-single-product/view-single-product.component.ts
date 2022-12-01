import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-single-product',
  templateUrl: './view-single-product.component.html',
  styleUrls: ['./view-single-product.component.css']
})
export class ViewSingleProductComponent implements OnInit {

  products;
  pid;
  constructor(private _productService: ProductService,private _loginService : LoginService, private snack: MatSnackBar, private route: ActivatedRoute) { }

  userType;

  ngOnInit(): void {
    this.userType = this._loginService.getUserRole();
    this.pid = this.route.snapshot.params['pid'];
    this._productService.getProduct(this.pid).subscribe(
      (data: any) => {
        console.log("data ==  ", data)
        this.products = data;
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
