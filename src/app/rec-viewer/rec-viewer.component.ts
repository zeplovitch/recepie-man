import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { RecepieResponse } from '../rec-builder/Recepie';
import { StepResponse } from '../rec-builder/step/step';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-rec-viewer',
  templateUrl: './rec-viewer.component.html',
  styleUrls: ['./rec-viewer.component.css']
})
export class RecViewerComponent implements OnInit {
  constructor(private mainService: MainService) {}

  listOfRecepies: { id: string; title: string }[] = [];

  recepie: RecepieResponse = null;
  currentStep: StepResponse;
  getImage(imageName: string): string {
    return environment.imageBase + 'images/' + imageName;
  }
  getFullRecepie(id: string) {
    this.mainService.getRecepie(id).subscribe(data => {
      this.recepie = { ...data[0] };
      this.currentStep = this.recepie.steps[0];
      console.log(this.recepie.assets);
    });
  }
  reset() {
    this.currentStep = null;
  }
  moveNext() {
    if (this.currentStep.number < this.recepie.steps.length) {
      this.currentStep = this.recepie.steps[this.currentStep.number];
    }
  }
  movePrev() {
    if (this.currentStep.number > 1) {
      this.currentStep = this.recepie.steps[this.currentStep.number - 2];
    }
  }
  ngOnInit() {
    this.mainService.getRecepieList().subscribe(data => {
      this.listOfRecepies = [...data];
    });
  }
}
