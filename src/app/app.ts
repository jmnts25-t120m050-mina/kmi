import { Component, signal } from '@angular/core';
import {Calc} from './components/calc/calc';

@Component({
  imports: [Calc],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('kmi');
}
