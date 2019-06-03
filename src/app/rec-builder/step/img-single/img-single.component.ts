import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-single',
  templateUrl: './img-single.component.html',
  styleUrls: ['./img-single.component.css']
})
export class ImgSingleComponent implements OnInit {
  @Output() loadImageEvent = new EventEmitter<File>();
  constructor() {}
  onChange(event) {
    this.loadImageEvent.emit(event.target.files[0]);
  }
  ngOnInit() {}
}
