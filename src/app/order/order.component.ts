import { Component, OnInit } from '@angular/core';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardFast,
  faForwardStep,
  faPlusCircle,faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { HttpServerService } from '../services/http-server.service';
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
  public isDescending: boolean = true;
  faBackwardFast = faBackwardFast;
  faBackwardStep = faBackwardStep;
  faForwardFast = faForwardFast;
  faForwardStep = faForwardStep;
  faPlusCircle=faPlusCircle;
  faEdit=faEdit;
  faTrash=faTrash;
  constructor( private getDataServer:HttpServerService) {}
  //get data and tinh so luong trang
  public ngOnInit(): void {
    this.getOrderList();
  }
  public getOrderList(): void{
    //get data tu service
    this.getDataServer.getdataAPI('OrderList').subscribe((data)=>{
      this.orderlists=data;
      this.orderlists.sort((a, b) => b.id - a.id);   
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
      return this.orderlists; // Trả về mảng gốc nếu không có giá trị search
    }
    
    const filteredOrderLists = this.orderlists.filter((item) => {
      // Lặp qua từng thuộc tính của phần tử để tìm kiếm
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = item[key];
          
          // Kiểm tra nếu giá trị thuộc tính khớp với giá trị search
          if (value.toString().toLowerCase().includes(this.search.toLowerCase())) {
            return true; // Phần tử khớp, được giữ lại trong kết quả lọc
          }
        }
      }
      
      return false; // Không có phần tử khớp, bị loại bỏ trong kết quả lọc
    });
    this.pageCount = Math.ceil(filteredOrderLists.length / this.pagesize); // Tính lại số trang hiển thị
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
}
