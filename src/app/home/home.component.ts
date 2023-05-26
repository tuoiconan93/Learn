import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Discs: any[]=[];
  public cities: any[]=[];
  public ward: any[]=[];

  constructor(private http: HttpClient) { }
  public ngOnInit(): void {
    this.http.get('assets/data.json').subscribe((data:any) => {
      this.cities=data;
    });
  }
  public changeCity(event: any) {
    const name = event.target.value
   
    this.Discs=this.cities.find(data => data.Name===name)?.Districts || []

  }
  public changeDisc(event: any) {
    const name = event.target.value
   
    this.ward=this.Discs.find(data => data.Name===name)?.Wards || []
  }
  public changeWards(event: any) {
    const name = event.target.value
   
  }
  
}

