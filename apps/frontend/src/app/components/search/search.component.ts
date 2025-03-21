import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SearchComponent {
  searchQuery = '';

  onSearch() {
    console.log('Search query:', this.searchQuery);
    // Add search logic here
  }
}
