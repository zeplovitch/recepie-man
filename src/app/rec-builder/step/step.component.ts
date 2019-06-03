import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step } from './step';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  @Input() step: Step;
  @Input() title = '';
  @Output() nextStepEmitter = new EventEmitter<number>();
  @Output() prevStepEmitter = new EventEmitter<number>();
  @Output() finishEmitter = new EventEmitter<number>();
  constructor(private http: HttpClient) {}

  // imageArray: File[] = [];

  deleteEmitter(index: number) {
    this.step.uploader.splice(index, 1);
  }
  loadImageEvent(event: any) {
    this.step.uploader.push(event);
    console.dir(event);
  }
  ngOnInit() {}

  nextStep(currentStep: number) {
    this.nextStepEmitter.emit(currentStep);
  }
  prevStep(currentStep: number) {
    this.prevStepEmitter.emit(currentStep);
  }
  finish() {
    this.finishEmitter.emit();
  }
}
