import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { KeycloakService } from '../services/keycloak.service';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardFast,
  faForwardStep,
  faPlusCircle,faEdit,
  faTrash,
  faSave,
  faRefresh,
  faCancel,
} from '@fortawesome/free-solid-svg-icons';
import { HttpServerService } from '../services/http-server.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public search: string = '';
  public pagesize: number = 50;
  public orderlists: any[] = [];
  public currentPage: number = 1;
  public pageCount: number = 0;
  public startitemshow: number=0;
  public enditemshow: number=0;
  public isDescending: boolean = true;
  public datePipe = new DatePipe('en-US');
  public originalOrderLists: any[] = [];
  faBackwardFast = faBackwardFast;
  faBackwardStep = faBackwardStep;
  faForwardFast = faForwardFast;
  faForwardStep = faForwardStep;
  faPlusCircle=faPlusCircle;
  faEdit=faEdit;
  faTrash=faTrash;
  faSave=faSave;
  faRefresh=faRefresh;
  faCancel=faCancel;
  supplier: any=[];
  constructor( private getDataServer:HttpServerService, private formBuider: FormBuilder, private keycloakService: KeycloakService) {}
  public ngOnInit(): void {
    this.getOrderList();
    this.getUserProfile();
  }
  public getOrderList(): void{
    //get data tu service
    this.getDataServer.getdataAPI('OrderList').subscribe((data)=>{
      this.orderlists=data;
      this.orderlists.sort((a, b) => b.id - a.id);
      this.originalOrderLists = JSON.parse(JSON.stringify(data));
    });
    this.getDataServer.getdataAPI('supplier').subscribe((data)=>{
      this.supplier=data;
    });
  }
   //hien thi trang theo currenpage
   public updateStartItemShow(): void {
    this.startitemshow = (this.currentPage - 1) * this.pagesize;
    this.enditemshow=this.startitemshow+this.pagesize;

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
    this.pagesize = parseInt(this.pagesize.toString(), 10);
    this.pageCount = Math.ceil(this.orderlists.length / this.pagesize);
    this.updateStartItemShow();
  }
  //loc theo id
  toggleSortOrder(): void {
    this.isDescending = !this.isDescending; // Đảo ngược thứ tự sắp xếp
    this.orderlists.sort((a, b) => {
      if (this.isDescending) {
        return b.id - a.id; // Sắp xếp giảm dần theo id
      } else {
        return a.id - b.id; // Sắp xếp tăng dần theo id
      }
    });
  }
  public filterOrderLists(): any[] {
    if (!this.search) {
      this.pageCount = Math.ceil(this.orderlists.length / this.pagesize);
      return this.orderlists;
    }
    
    const filteredOrderLists = this.orderlists.filter((item) => {
      const itemString = JSON.stringify(item).toLowerCase();
      return itemString.includes(this.search.toLowerCase());
    });
    
    this.pageCount = Math.ceil(filteredOrderLists.length / this.pagesize);  
    if(this.currentPage>this.pageCount){
      this.currentPage=1;
      this.getPages();
      
    }  
    return filteredOrderLists;
  }  
  public deleteOrder(id: number): void {
    const url = `OrderList/${id}`; // Đặt URL phù hợp với API của bạn
    this.getDataServer.deleteDataAPI(url).subscribe(data => {
    });
    this.getOrderList();
      // Thực hiện các hành động phù hợp sau khi xóa thành công
  }
  
  public editOrder(item: any): void {
    item.DeliveryDate = this.datePipe.transform(item.DeliveryDate, 'MM/dd/yyyy');
    item.ReceivedDate = this.datePipe.transform(item.ReceivedDate, 'MM/dd/yyyy');
    this.toggleEditingMode(item);
  }
  public cancel(item: any) {
    const initialItem = this.originalOrderLists.find((x) => x.id === item.id);
    Object.assign(item,initialItem);
    this.toggleEditingMode(item);
  }
  
//funtion update data
  public saveChanges(item: any): void {
      const payload = {
        ProductName: item.ProductName, 
        Quality: item.Quality,
        Notes: item.Notes,
        DeliveryDate: item.DeliveryDate,
        Editedby: this.userProfile.email,
        ReceivedDate: item.ReceivedDate,
        Received: item.Received,
        PO: item.PO,
        From: item.From,
        EditedTime: new Date(),
      };
      const url = `OrderList/${item.id}`;
      this.getDataServer.editDataAPI(url, payload).subscribe(data => {
        // Xử lý sau khi lưu thành công (nếu cần)
      });
      this.toggleEditingMode(item);
  }
  userProfile: any={};
  getUserProfile():void{
    this.keycloakService.getUserProfile().then((data) => {  
      this.userProfile=data;
    }).catch((error) => {
    
    }); 
  }
  public toggleEditingMode(item: any): void {
    item.editingMode = !item.editingMode;
  }
}
