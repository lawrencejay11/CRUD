import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postContact(data : any) {
    return this.http.post<any>("https://jsonplaceholder.typicode.com/users", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getContact() {
    return this.http.get<any>("https://jsonplaceholder.typicode.com/users")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateContact(data : any, id : number) {
    return this.http.get<any>("https://jsonplaceholder.typicode.com/users/1" + id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteContact(id : number) {
    return this.http.get<any>("https://jsonplaceholder.typicode.com/users/1" + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
