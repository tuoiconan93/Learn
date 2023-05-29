import { Component, OnInit } from '@angular/core';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardFast,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  public search: string = '';
  public pagesize: number = 50;
  public services: any[] = [];
  public currentPage: number = 1;
  public pageCount: number = 0;
  public startitemshow: number=0;
  faBackwardFast = faBackwardFast;
  faBackwardStep = faBackwardStep;
  faForwardFast = faForwardFast;
  faForwardStep = faForwardStep;
  constructor(private http: HttpClient) {}
  //get data and tinh so luong trang
  public ngOnInit(): void {
    this.http.get('/assets/db/services.json').subscribe((data: any) => {
      this.services = data;
      this.pageCount = Math.ceil(this.services.length / this.pagesize);
      this.updateStartItemShow();
    });
  }
   //hien thi trang theo currenpage
   public updateStartItemShow(): void {
    this.startitemshow = (this.currentPage - 1) * this.pagesize;
  }
  //tinh trang hien tai
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
    this.updateStartItemShow();
    return pages;
  }
  //trang hien tai bang page show
  public setcurrentPage(page: number): void {
    this.currentPage = page;
    this.updateStartItemShow();
  }
  previous10Page(): void {
    if (this.currentPage > 10) {
      this.currentPage -= 10;
    } else {
      this.currentPage = 1;
    }
    this.updateStartItemShow();  
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage = 1;
    }
    this.updateStartItemShow(); 
  }
  //
  nextPage(): void {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
    } else {
      this.currentPage = this.pageCount;
    }
    this.updateStartItemShow();   
  }
  //next 10 trang
  next10Page(): void {
    if (this.currentPage < this.pageCount - 10) {
      this.currentPage += 10;
    } else {
      this.currentPage = this.pageCount;
    }
    this.updateStartItemShow();
  }
 
  //thay doi so luong hien thi
  public repaginate(): void {
    this.startitemshow = 0;
    this.currentPage=1;
    this.pageCount = Math.ceil(this.services.length / this.pagesize);
    this.updateStartItemShow();
  }

}
