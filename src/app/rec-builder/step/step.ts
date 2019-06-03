export const steps: Step[] = [];
export class Step {
  number: number;
  description: string;
  instructions: string;
  uploader: File[] = [];
  constructor() {
    this.number = 1;
    this.description = '';
    this.instructions = '';
  }
}
export class StepResponse {
  number: number;
  description: string;
  instructions: string;
  images: string[] = [];
  constructor() {
    this.number = 1;
    this.description = '';
    this.instructions = '';
  }
}
export const getSteps = () => {
  return [...steps];
};
