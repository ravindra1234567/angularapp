import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: HttpClient) { }
  
  // get comments
  public getComments() {
    return this._http.get(`${baseUrl}/comment/`)
  }

  // get comments by product id 
  public getCommentsByProductId(pid) {
    return this._http.get(`${baseUrl}/comment/product/${pid}`)
  }

  // add comment
  public addcomment(data) {
    return this._http.post(`${baseUrl}/comment/`, data);
  }

  // update comment
  public updatecomment(data) {
    return this._http.put(`${baseUrl}/comment/`, data);
  }

  // delete comment
  public deletecomment(cid) {
    return this._http.delete(`${baseUrl}/comment/${cid}`);
  }

  // get single comment
  public getcomment(cid) {
    return this._http.get(`${baseUrl}/comment/${cid}`);
  }

  // search comment
  public search(str) {
    return this._http.get(`${baseUrl}/comment/search/${str}`);
  }

  // get total count of comment
  public count() {
    return this._http.get(`${baseUrl}/allcomments`);
  }

  
}
