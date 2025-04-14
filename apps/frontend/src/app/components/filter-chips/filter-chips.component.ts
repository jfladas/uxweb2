import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
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
  @Output() filtersChanged = new EventEmitter<string[]>();

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
    this.emitActiveFilters();
  }

  private emitActiveFilters(): void {
    const activeFilters = this.chips
      .filter((chip) => chip.selected)
      .map((chip) => chip.name.toLowerCase());
    this.filtersChanged.emit(activeFilters);
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
