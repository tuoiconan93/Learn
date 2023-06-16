import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private timeout: any;
  //reload page
  public ngOnInit(): void {
    this.resetTimeout();
    window.addEventListener('click', this.resetTimeout.bind(this));
    window.addEventListener('mousemove', this.resetTimeout.bind(this));
    window.addEventListener('keypress', this.resetTimeout.bind(this));
  }
    private resetTimeout(): void {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    
      this.timeout = setTimeout(() => {
        window.location.reload();
      }, 30 * 60 * 1000); // 30 phút = 30 * 60 * 1000 milliseconds
    }
    
  public ngOnDestroy(): void {
    window.removeEventListener('click', this.resetTimeout);
    window.removeEventListener('mousemove', this.resetTimeout);
    window.removeEventListener('keypress', this.resetTimeout);
  }
  
}
