import { Component, OnInit, Input, OnChanges, SimpleChanges,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-msg-util',
  templateUrl: './msg-util.component.html',
  styleUrls: ['./msg-util.component.css']
})
export class MsgUtilComponent implements OnInit, OnChanges {
  @Input('messageText') messageText: string;
  @Input('showMessage') showMessage: boolean;
  @Input('messageTypeError') messageTypeError:boolean=false;
  
  @Output() msgHidden= new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  hideAlert(){
    this.msgHidden.emit(true);
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['showMessage']){
      this.showMessage = changes['showMessage'].currentValue;
    }
    if(changes.messageText){
      this.messageText=changes.messageText.currentValue;
    }
    //console.log(changes);
  }
}
