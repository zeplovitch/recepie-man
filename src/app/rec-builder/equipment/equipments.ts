export class Equipment {
  name: string;
  isSelected: boolean;
  qty?: number;
  constructor(name: string) {
    this.name = name;
    this.isSelected = false;
  }
}
