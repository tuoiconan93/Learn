import { Component, OnInit } from '@angular/core';
import{ faBackwardFast,faBackwardStep,faForwardFast,faForwardStep } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  pagesize=100;
  faBackwardFast=faBackwardFast;faBackwardStep=faBackwardStep;faForwardFast=faForwardFast;faForwardStep=faForwardStep;
 
  public ngOnInit(): void {
  }

}
