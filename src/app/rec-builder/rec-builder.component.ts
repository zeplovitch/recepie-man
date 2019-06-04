import { Component, OnInit } from '@angular/core';
import { Step } from './step/step';
import { Equipment } from './equipment/equipments';
import { MainService } from '../main.service';
import { Recipe } from './Recepie';

@Component({
  selector: 'app-rec-builder',
  templateUrl: './rec-builder.component.html',
  styleUrls: ['./rec-builder.component.css']
})
export class RecBuilderComponent implements OnInit {
  title = 'recepie-man';
  recipe: Recipe;
  equipments: Equipment[];
  currnetStep: Step;

  prevStep(stepNo: number) {
    if (stepNo > 1) {
      this.currnetStep = this.recipe.steps[stepNo - 2];
    } else {
      this.currnetStep = this.recipe.steps[0];
    }
  }
  nextStep(stepNo: number) {
    if (this.recipe.steps.length === stepNo) {
      this.addStep(stepNo + 1);
      this.currnetStep = this.recipe.steps[this.recipe.steps.length - 1];
    } else {
      this.currnetStep = this.recipe.steps[stepNo];
    }
  }
  constructor(private mainService: MainService) {}

  addStep(step: number) {
    this.recipe.steps.push({
      number: step,
      description: '',
      instructions: '',
      uploader: []
    });
  }
  finish() {
    this.mainService
      .finish(this.recipe, this.equipments)
      .subscribe(responseData => {
        alert('Recipe created !!');
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
    this.recipe = new Recipe();
    this.recipe.steps = [new Step()];
    this.currnetStep = this.recipe.steps[0];
  }
}
