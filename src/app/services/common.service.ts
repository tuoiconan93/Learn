import { Injectable, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CommonService{
  public orderlists: string[]= ['nguyen ha','phi long','sieu thanh'];
  constructor() {}
}
