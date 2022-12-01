import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  products = [];

  productData = {
    brand: "",
    content: "",
    name: "",
    productCode: "",
    status: true
  }
  constructor(private _productService: ProductService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  public addQuiz() {
    console.log("dat = ", this.productData);

    if (this.productData.name.trim() == "" || this.productData.name.trim() == null) {
      this.snack.open("Product Name Required !!", '', {
        duration: 3000,
      })
      return;
    }

    // call server
    this._productService.addProduct(this.productData).subscribe(
      (data) => {
        console.log("===========", data);
        this.snack.open('Product is added !!', '', {
          duration: 3000,
        })
        this.productData = {
          brand: "",
          content: "",
          name: "",
          productCode: "",
          status: true
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

}
