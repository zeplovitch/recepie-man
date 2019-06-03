import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.css']
})
export class ImgListComponent implements OnInit {
  @Input() imgFile: File = null;
  @Output() deleteEmitter = new EventEmitter();
  constructor() { }
  myImageFunc(myImage) {
    myImage.src = URL.createObjectURL(this.imgFile);
  }
  deleteOne() {
    this.deleteEmitter.emit();
  }
  ngOnInit() {
  }

}
