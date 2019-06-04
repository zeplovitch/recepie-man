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

  deleteEmitter(index: number) {
    this.step.uploader.splice(index, 1);
  }
  loadImageEvent(event: any) {
    this.step.uploader.push(event);
  }

  ngOnInit() {}

  nextStep(currentStepNumber: number) {
    this.nextStepEmitter.emit(currentStepNumber);
  }
  prevStep(currentStepNumber: number) {
    this.prevStepEmitter.emit(currentStepNumber);
  }
  finish() {
    this.finishEmitter.emit();
  }
}
