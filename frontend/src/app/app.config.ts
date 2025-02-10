import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';  // Import Material Card module
import { MatButtonModule } from '@angular/material/button';  // Import Material Button module
import { MatFormFieldModule } from '@angular/material/form-field';  // Import Material Form Field module
import { MatInputModule } from '@angular/material/input';  // Import Material Input module

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    MatCardModule,  // Add Material Card module
    MatButtonModule,  // Add Material Button module
    MatFormFieldModule,  // Add Material Form Field module
    MatInputModule  // Add Material Input module
  ]
};
