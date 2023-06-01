import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,FormControl,Validators} from '@angular/forms';
import { faSave, faCancel, faX,faPlusCircle,faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpServerService } from '../services/http-server.service';
@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css'],
})
export class NeworderComponent implements OnInit {
  faSave = faSave;
  faCancel = faCancel;
  faX = faX;
  faPlusCircle=faPlusCircle;
  faChevronCircleLeft=faChevronCircleLeft;
  public formOrder = this.formBuider.group({
    ProductName: ['',Validators.required],
    Quality: ['',Validators.required],
    PriceVND: [''],
    TotalVND: [null],
    Category: ['',Validators.required],
    Location: ['',Validators.required],
    Department: [null,Validators.required],
    From: ['',Validators.required],
    newSupplier: [''],
    OrderDate: new FormControl(new Date().toLocaleDateString()),
    selectdate:[''],
  });
  public supplier: any[] = [];
  shownewsupplier:boolean=false;
  public Category: string[] = [];
  public location: string[] = [];
  constructor(
    private formBuider: FormBuilder,
    private common: HttpServerService
  ) {}
  ngOnInit(): void {
    this.getSupplier();
    this.Category = this.common.Category;
    this.location = this.common.location;
  }
  public onSubmit(): void {
    const payload = this.formOrder.value;
    this.common.postdataAPI('OrderList', payload).subscribe((data) => {
    });
  }
  public onReset(): void {
    this.formOrder.reset();
  }
  public getSupplier():void{
    this.common.getdataAPI('supplier').subscribe((data)=>{
      this.supplier=data;
    });
  }
  public postSupplier(): void {
    //gọi trước khi tạo tránh bị trùng lặp id
    this.getSupplier();
    const payload ={Name: this.formOrder.get('newSupplier')?.value}
    this.common.postdataAPI('supplier', payload).subscribe((data) => {
          this.getSupplier(); // Cập nhật lại danh sách nhà cung cấp sau khi thêm mới
        });
  }
  
}
