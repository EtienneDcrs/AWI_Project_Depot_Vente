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
  @Output() applyFilters = new EventEmitter<{ price?: number; minAge?: number; playerCount?: [number, number] }>();

  price: number | undefined = undefined;
  minAge: number | undefined = undefined;
  playerCount: [number, number] = [1, 10]; // Assuming a range of 1 to 10 players

  // Emit the filters when applied
  apply() {
    this.applyFilters.emit({
      price: this.price,
      minAge: this.minAge,
      playerCount: this.playerCount
    });
  }
}
