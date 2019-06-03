import { Step, StepResponse } from './step/step';
export class Assets {
  name: string;
  qty?: number;
}
export class Recepie {
  title: string;
  steps: Step[];
  assets: Assets[];
  constructor() {
    this.title = '';
    this.steps = [];
    this.assets = [];
  }
}
export class RecepieResponse {
  title: string;
  steps: StepResponse[];
  assets: Assets[];
  constructor() {
    this.title = '';
    this.steps = [];
    this.assets = [];
  }
}
