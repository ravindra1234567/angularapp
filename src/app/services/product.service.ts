import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }
  
  // get all active products
  public products() {
    return this._http.get(`${baseUrl}/product/`)
  }

  // get All products
  public getProducts() {
    return this._http.get(`${baseUrl}/product/admin`)
  }

  // add product
  public addProduct(data) {
    return this._http.post(`${baseUrl}/product/`,data);
  }

  // update product
  public updateProduct(data) {
    return this._http.put(`${baseUrl}/product/`, data);
  }

  // delete product
  public deleteProduct(pid) {
    return this._http.delete(`${baseUrl}/product/${pid}`);
  }

  // get single product
  public getProduct(pid) {
    return this._http.get(`${baseUrl}/product/${pid}`);
  }

  // search product
  public search(str) {
    return this._http.get(`${baseUrl}/product/search/${str}`);
  }

  // get total count of product
  public count() {
    return this._http.get(`${baseUrl}/count`);
  }
}
