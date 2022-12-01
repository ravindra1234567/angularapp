import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products = [];
  nameSearch = '';

  productData = {
    pid: "",
    name: "",
    content: "",
    brand: "",
    status: true,
    image: null,
    productCode: ""
  }
  constructor(private _productService: ProductService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
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

  public deleteProduct(pid) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: "Delete",
      title: "Are you sure, want to delete this product ?"
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(pid).subscribe(
          (data) => {
            Swal.fire("Product has deleted !!", "Success", "success");
            this.products = this.products.filter((q) => q.pid != pid)
          },
          (error) => {
            Swal.fire("Product has not deleted !!", "Error", "error");

          }
        )
      }
    })
  }

  public approved(pid, content, brand, status, productCode,name) {
    
    this.productData.status = status === true ? false : true;
    this.productData.pid = pid;
    this.productData.content = content;
    this.productData.brand = brand;
    this.productData.productCode = productCode;
    this.productData.name = name;


    this._productService.updateProduct(this.productData).subscribe(
      (data: any) => {
        // this.products = data;
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
