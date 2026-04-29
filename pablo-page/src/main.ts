// Punto de entrada de la aplicación Angular
// main.ts = archivo que inicia la aplicación
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Iniciar la aplicación con componente standalone
bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
