import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig, // Garde la config existante
  providers: [...(appConfig.providers || []), provideAnimations()] // Ajoute l'animation aux providers existants
}).catch((err) => console.error(err));
