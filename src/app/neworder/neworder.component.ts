import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
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
    ProductName: ['', Validators.required],
    Quality: ['', Validators.required],
    PriceVND: [''],
    TotalVND: [''],
    Category: ['', Validators.required],
    Department: ['', Validators.required],
    Location: ['', Validators.required],
    From: ['', Validators.required],
    newSupplier: ['', Validators.required],
    

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
      console.log('post data', data);
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
    const payload ={Name: this.formOrder.get('newSupplier')?.value}
    
    this.common.postdataAPI('supplier', payload).subscribe((data) => {
          this.getSupplier(); // Cập nhật lại danh sách nhà cung cấp sau khi thêm mới
        });
  }
  
}
