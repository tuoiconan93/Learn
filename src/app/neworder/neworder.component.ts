import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import{faSave,faCancel,faX} from '@fortawesome/free-solid-svg-icons'; 
@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})
export class NeworderComponent implements OnInit {
  faSave=faSave; faCancel=faCancel;faX=faX;
  public orderlists=['phi long','sieu thanh','nguyen ha']
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
  constructor(private http: HttpClient, private formBuider: FormBuilder){}
  ngOnInit(): void {

  }
  public onSubmit(): void{
    
    // console.log('submit form: formData2222: ' , this.formData2.value);
    
  }
  public onReset(): void{
    this.formData2.reset();
  }

}
