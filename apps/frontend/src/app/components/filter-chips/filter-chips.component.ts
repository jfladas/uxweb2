import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
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
export class FilterChipsComponent implements AfterViewInit {
  @ViewChild('chipsContainer') chipsContainer!: ElementRef;

  chips: Chip[] = [
    { name: 'DIGITAL IDEATION', selected: true },
    { name: 'STAIR', selected: true },
    { name: 'FRAME', selected: true },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.checkOverflow(), 0);
  }

  onChipClick(chip: Chip): void {
    chip.selected = !chip.selected;
  }

  private checkOverflow(): void {
    const container = this.chipsContainer.nativeElement;
    const isOverflowing = container.scrollWidth > container.clientWidth;

    if (isOverflowing) {
      this.chips[0].name = 'DI';
    } else {
      this.chips[0].name = 'DIGITAL IDEATION';
    }

    this.cdr.detectChanges();
  }
}
