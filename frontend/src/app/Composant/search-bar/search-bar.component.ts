import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>(); // Emit search event
  @Input() showSeller = false; // Input to show seller

  // Updated method to handle search input
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement; // Assert that the target is an HTMLInputElement
    const value = input.value; // Get the input value

    this.search.emit(value); // Emit the search value
  }
}
