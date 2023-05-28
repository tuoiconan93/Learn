import { Component, OnInit } from '@angular/core';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardFast,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
 
  public search: string = '';
  public pagesize: number = 100;
  public orderlists: any[] = [];
  public pages: number[] = [];
  public currentPage: number=1;
  pageCount: number = 0;
  faBackwardFast = faBackwardFast;
  faBackwardStep = faBackwardStep;
  faForwardFast = faForwardFast;
  faForwardStep = faForwardStep;
  constructor(private http: HttpClient) {
  }
  public ngOnInit(): void {
    this.http.get('/assets/db/orderlist.json').subscribe((data: any) => {
      this.orderlists = data;
      this.pageCount = Math.ceil(this.orderlists.length / this.pagesize);
    });
  }
  public getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.floor((this.currentPage - 1) / 10) * 10 + 1;
    let endPage = startPage + 9;
  
    if (endPage > this.pageCount) {
      endPage = this.pageCount;
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }
  public setcurrentPage(page: number): void {
    this.currentPage = page;
  }
  previous10Page(): number{
    if(this.currentPage>10){
this.currentPage-=10;
    }else{
      this.currentPage=1;
    }
    return this.currentPage;

  }
  previousPage(): number{
    if(this.currentPage>1){
      this.currentPage--;
    }else{
      this.currentPage=1;
    }
    return this.currentPage;
  }
  nextPage(): number{
    if(this.currentPage<this.pageCount){
      this.currentPage++;
    }else{
      this.currentPage=this.pageCount;
    }
return this.currentPage;
  }
  next10Page(): number{
    if(this.currentPage<this.pageCount-10){
this.currentPage+=10;
    }else{
      this.currentPage=this.pageCount;
    }
    return this.currentPage;

  }
}
