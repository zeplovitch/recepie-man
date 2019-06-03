import { Component, OnInit } from '@angular/core';
import { Step } from './step/step';
import { Equipment } from './equipment/equipments';
import { MainService } from '../main.service';
import { Recepie } from './Recepie';

@Component({
  selector: 'app-rec-builder',
  templateUrl: './rec-builder.component.html',
  styleUrls: ['./rec-builder.component.css']
})
export class RecBuilderComponent implements OnInit {
  title = 'recepie-man';
  steps: Step[];
  recepie: Recepie;
  equipments: Equipment[];
  currnetStep: Step;

  prevStep(stepNo: number) {
    if (stepNo > 1) {
      this.currnetStep = this.steps[stepNo - 2];
    } else {
      this.currnetStep = this.steps[0];
    }
  }
  nextStep(stepNo: number) {
    if (this.steps.length === stepNo) {
      this.addStep(stepNo + 1);
      this.currnetStep = this.steps[this.steps.length - 1];
    } else {
      this.currnetStep = this.steps[stepNo];
    }
  }
  constructor(private mainService: MainService) {}

  addStep(step: number) {
    this.steps.push({
      number: step,
      description: '',
      instructions: '',
      uploader: []
    });
  }
  finish() {
    console.log(this.recepie.title);
    this.mainService
      .finish(this.recepie, this.equipments)
      .subscribe(responseData => {
        alert('Receipe created !!');
      });
  }
  ngOnInit() {
    this.mainService.getAssets().subscribe(
      data => {
        this.equipments = data;
      },
      error => {
        alert('seems like you have a communication error with mongoDB');
      }
    );
    this.recepie = new Recepie();
    const firstStep = new Step();
    this.steps = [firstStep];

    this.recepie.steps = this.steps;
    if (this.steps.length === 0) {
      this.addStep(1);
      this.currnetStep = this.steps[this.steps.length - 1];
    } else {
      this.currnetStep = this.steps[0];
    }
  }
}
