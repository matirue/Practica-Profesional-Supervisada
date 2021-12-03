import { formatNumber } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  minutos:number;
  segundos:number;
  min:string;
  seg:string;
  time:string;
  @Output() emitter= new EventEmitter<string>();

  constructor() { 
    this.minutos = 0;
    this.segundos = 0;
    this.setStrTime();
    setInterval(()=>this.tick(), 1000);
  }

  ngOnInit() {}

  tick():void {
    this.segundos++;
    if(this.segundos > 59){
      this.segundos = 0;
      this.minutos++;
    }
    this.setStrTime();
    this.emitter.emit(this.time);
  }

  setStrTime():void {
    this.seg = formatNumber(this.segundos, 'en-US', '2.0-0');
    this.min = formatNumber(this.minutos, 'en-US', '2.0-0');
    this.time = this.min + ':' + this.seg;
  }
}
