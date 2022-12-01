import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.css']
})
export class LoadProductComponent implements OnInit {

  products = [];
  nameSearch = '';

  constructor(private _productService: ProductService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this._productService.products().subscribe(
      (data: any) => {
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

}
