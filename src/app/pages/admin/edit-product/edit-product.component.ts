import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  pid

  productData = {
    brand: "",
    content: "",
    name: "",
    productCode: "",
    status: true
  }

  constructor(private route: ActivatedRoute, private _productService: ProductService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.pid = this.route.snapshot.params['pid'];

    this._productService.getProduct(this.pid).subscribe(
      (data:any) => {
        this.productData = data;
      },
      (error) => {
        this.snack.open('Something went wrong !! Try again', '', {
          duration: 3000,
        })
      }
    )
  }

  public editProduct() {
    console.log("dat = ", this.productData);

    if (this.productData.name.trim() == "" || this.productData.name.trim() == null) {
      this.snack.open("Product Name Required !!", '', {
        duration: 3000,
      })
      return;
    }

    // call server
    this._productService.updateProduct(this.productData).subscribe(
      (data) => {
        console.log("===========", data);
        this.snack.open('Product has updated !!', '', {
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
