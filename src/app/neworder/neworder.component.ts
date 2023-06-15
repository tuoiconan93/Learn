import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators,FormGroup} from '@angular/forms';
import {
  faSave,
  faCancel,
  faX,
  faPlusCircle,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { HttpServerService } from '../services/http-server.service';
import { KeycloakService } from '../services/keycloak.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css'],
})
export class NeworderComponent implements OnInit {
  public datePipe = new DatePipe('en-US');
  faSave = faSave;
  faCancel = faCancel;
  faX = faX;
  faPlusCircle = faPlusCircle;
  faChevronCircleLeft = faChevronCircleLeft;
  public formOrder = this.formBuider.group({
    ProductName: ['', Validators.required],
    Quality: ['', Validators.required],
    PriceVND: [''],
    TotalVND: [''],
    Category: ['', Validators.required],
    Location: ['', Validators.required],
    Department: ['', Validators.required],
    From: ['', Validators.required],
    newSupplier: [''],
    OrderDate: new FormControl( new Date()),
    selectdate: [''],
    Notes:[''],
  });
  public supplier: any[] = [];
  shownewsupplier: boolean = false;
  public Category: string[] = [];
  public location: string[] = [];
  constructor(
    private formBuider: FormBuilder,
    private common: HttpServerService, private keycloakService : KeycloakService,
  ) {}
  ngOnInit(): void {
    this.getSupplier();
    this.Category = this.common.Category;
    this.location = this.common.location;
    this.getUserProfile();
  }
  public onSubmit(): void {
    const payload = {
      ProductName: this.formOrder.controls['ProductName'].value,
      Quality: this.formOrder.controls['Quality'].value,
      PriceVND: this.formOrder.controls['PriceVND'].value,
      TotalVND: this.formOrder.controls['TotalVND'].value,
      Category: this.formOrder.controls['Category'].value,
      Location: this.formOrder.controls['Location'].value,
      Department: this.formOrder.controls['Department'].value,
      From: this.formOrder.controls['From'].value,
      OrderDate: this.formOrder.controls['OrderDate'].value,
      Notes: this.formOrder.controls['Notes'].value,
      CreatedBy: this.userProfile.email,
    };
    this.common.postdataAPI('OrderList', payload).subscribe((data) => {});
  }
  userProfile: any={};
  getUserProfile():void{
    this.keycloakService.getUserProfile().then((data) => {  
      this.userProfile=data;
    }).catch((error) => {
    
    }); 
  }
  public onReset(): void {
    this.formOrder.reset();
  }
  public getSupplier(): void {
    this.common.getdataAPI('supplier').subscribe((data) => {
      this.supplier = data;
    });
  }
  public postSupplier(): void {
    //gọi trước khi tạo tránh bị trùng lặp id
    this.getSupplier();
    const payload = { Name: this.formOrder.get('newSupplier')?.value };
    this.common.postdataAPI('supplier', payload).subscribe((data) => {});
    this.getSupplier(); // Cập nhật lại danh sách nhà cung cấp sau khi thêm mới
  }
  public toggleEditingMode(order: any): void {
    order.editingMode = !order.editingMode;
  }
}
