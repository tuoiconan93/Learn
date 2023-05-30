import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import{faSave,faCancel,faX} from '@fortawesome/free-solid-svg-icons'; 
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})
export class NeworderComponent implements OnInit {
  faSave=faSave; faCancel=faCancel;faX=faX;
  public orderlists: any[]=[]
  public formData2 =this.formBuider.group({
    ProductName: ['', Validators.required],
    Quality: ['',Validators.required],
    PriceVND: [''],
    TotalVND: [''],
    Category: ['',Validators.required],
    Department: ['',Validators.required],
    Location: ['',Validators.required],
    From: ['',Validators.required],
  });
  constructor(private http: HttpClient, private formBuider: FormBuilder,private common:CommonService){}
  ngOnInit(): void {
  this.orderlists=this.common.orderlists;
  // console.log('lay tu service',this.orderlists);
  // this.http.get('/assets/db/orderlist.json').subscribe((data:any) => {
  //   this.orderlists=data;
  //   console.log('lay tu json',this.orderlists);
  // });

  
  }
  public onSubmit(): void{
    
    // console.log('submit form: formData2222: ' , this.formData2.value);
    
  }
  public onReset(): void{
    this.formData2.reset();
  }

}
