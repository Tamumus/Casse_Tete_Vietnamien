import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { Gameboard } from './gameboard/gameboard';

@Component({
  selector: 'app-root',
  imports: [Gameboard],
  template: `
    <main>
      <header class="brand-name">
      </header>
      <section class="content">
        <app-gameboard></app-gameboard>
      </section>
    </main>
  `,
  //styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Le casse tete viet!';
}