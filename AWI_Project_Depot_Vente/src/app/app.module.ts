import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Ajoute ceci
import { AppComponent } from './app.component';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // <-- Ajoute ceci
        AppComponent
    ],
    providers: [],
    // bootstrap: [AppComponent]
})
export class AppModule { }
