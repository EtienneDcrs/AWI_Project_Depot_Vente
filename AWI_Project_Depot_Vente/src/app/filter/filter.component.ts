import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() applyFilters = new EventEmitter<{ price?: number;}>();

  price: number | undefined = undefined;

  // Emit the filters when applied
  apply() {
    this.applyFilters.emit({
      price: this.price,
    });
  }
}
