import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  private REST_API_SERVER='http://localhost:3000/';
  private httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  public getOrderList(): Observable<any>{
    const url=`${this.REST_API_SERVER}OrderList`;
    return this.httpClient.get<any>(url,this.httpOptions);
  }
  public getService(): Observable<any>{
    const url=`${this.REST_API_SERVER}Services`;
    return this.httpClient.get<any>(url,this.httpOptions);
  }
}
