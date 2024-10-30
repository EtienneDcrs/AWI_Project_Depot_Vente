import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    template: `
    <div class="dialog-content">
      <h2>Confirmation</h2>
      <p>Êtes-vous sûr de vouloir mettre ce jeu en rayon ?</p>
      <div class="dialog-buttons">
        <button class="confirm-button" (click)="confirm()">Oui</button>
        <button class="cancel-button" (click)="close()">Annuler</button>
      </div>
    </div>
  `,
    styles: [`
    .dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
    }
    h2 {
      margin-top: 0;
      font-size: 24px;
      color: #333;
    }
    p {
      margin: 20px 0;
      font-size: 16px;
      color: #666;
    }
    .dialog-buttons {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .confirm-button {
      background-color: #4CAF50;
      color: #fff;
    }
    .confirm-button:hover {
      background-color: #45A049;
    }
    .cancel-button {
      background-color: #f44336;
      color: #fff;
    }
    .cancel-button:hover {
      background-color: #d32f2f;
    }
  `]
})
export class ConfirmDialogComponent {
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    confirm(): void {
        this.dialogRef.close(true);  // Confirme l'action
    }

    close(): void {
        this.dialogRef.close(false);  // Annule l'action
    }
}
