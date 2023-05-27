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
  constructor(private http: HttpClient) {}
  public search: string='';
  public pagesize: number = 100;
  public orderlists:any[] = [];
  public pages: number[]=[];
  pageCount: number=0;
  faBackwardFast = faBackwardFast;
  faBackwardStep = faBackwardStep;
  faForwardFast = faForwardFast;
  faForwardStep = faForwardStep;
  public ngOnInit(): void {
    this.http.get('/assets/db/orderlist.json').subscribe((data: any) => {
      this.orderlists = data;
      this.pageCount=Math.ceil(this.orderlists.length/this.pagesize);
      console.log(this.pageCount);

    });
    
  }

}
