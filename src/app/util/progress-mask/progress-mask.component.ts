import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-mask',
  templateUrl: './progress-mask.component.html',
  styleUrls: ['./progress-mask.component.css']
})
export class ProgressMaskComponent implements OnInit {
  @Input() showProgress:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
