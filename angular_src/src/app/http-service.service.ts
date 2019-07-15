import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpServiceService {

  server = "https://nhom-7-4.herokuapp.com";
  //server = "http://localhost:3000";

  constructor(private http: Http) { }

  //Create
  postServer(route: string, data: any){
    const url = this.server+route;
    const body = data;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers: headers, withCredentials: true }).toPromise().then(res => res.json());
  }
  //Read
  getServer(route: string) {
    const url = this.server+route;
    return this.http.get(url, {withCredentials: true}).toPromise().then(res => res.json())
  }
  //Update
  putServer(route: string, data: any){
    const url = this.server+route;
    const body = data;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(url, JSON.stringify(body), { headers: headers, withCredentials: true }).toPromise().then(res => res.json());
  }
  //Delete
  deleteServer(route: string) {
    const url = this.server+route;
    return this.http.delete(url, {withCredentials: true}).toPromise().then(res => res.json())
  }
  uploadImageServer(file: File) {
    let formData: FormData = new FormData();
    formData.append('image', file, file.name);
    const headers = new Headers();
    return this.http.post(this.server+"/api/upload/image/", formData, { headers: headers }).toPromise().then(res => res.json());
  }
}
