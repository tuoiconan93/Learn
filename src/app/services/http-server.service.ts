import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService{
  private REST_API_SERVER='http://localhost:3000/';
  private httpOptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public supplier: string[] = [];
  public Category: string[] = ['computer', 'Cartridge', 'Batteries'];
  public location: string[] = ['Quang Nam', 'Quang Ngai'];

  constructor(private httpClient: HttpClient) { }
  
  public getdataAPI(url: string): Observable<any>{
    const fullurl=`${this.REST_API_SERVER}${url}`;
    return this.httpClient.get<any>(fullurl,this.httpOptions);
  }
  public postdataAPI(url: string,payload:any): Observable<any>{
    const fullurl=`${this.REST_API_SERVER}${url}`;
    return this.httpClient.post<any>(fullurl,payload,this.httpOptions);
  }
  public deleteDataAPI(url: string): Observable<any> {
    const fullurl = `${this.REST_API_SERVER}${url}`;
    return this.httpClient.delete<any>(fullurl, this.httpOptions);
  }
}
