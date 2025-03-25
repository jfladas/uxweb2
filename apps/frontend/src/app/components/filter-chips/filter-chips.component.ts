import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Chip {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
  imports: [CommonModule],
})
export class FilterChipsComponent {
  chips: Chip[] = [
    { name: 'DIGITAL IDEATION', selected: false },
    { name: 'STAIR', selected: false },
    { name: 'FRAME', selected: false },
  ];

  onChipClick(chip: Chip): void {
    chip.selected = !chip.selected;
  }
}
