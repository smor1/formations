import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() message: string;

  @Output() tick;

  constructor() {
  }

  ngOnInit(): void {
  }

}
