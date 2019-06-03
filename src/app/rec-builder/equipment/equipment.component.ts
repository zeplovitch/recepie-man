import { Component, Input } from '@angular/core';
import { Equipment } from './equipments';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  @Input() equipments: Equipment[];

  constructor() {}

  toggle(equipment: Equipment) {
    equipment.isSelected = !equipment.isSelected;
    if (equipment.isSelected) {
      if (!equipment.qty) {
        equipment.qty = 1;
      }
    } else {
      equipment.qty = null;
    }
  }
}
