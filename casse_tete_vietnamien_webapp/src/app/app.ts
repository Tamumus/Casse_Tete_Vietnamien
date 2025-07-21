import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { Gameboard } from './gameboard/gameboard';
import { Sticker } from './sticker/sticker';

@Component({
  selector: 'app-root',
  imports: [Gameboard, Sticker],
  template: `
    <main>
      <header class="brand-name">
      </header>
      <section class="content">
        <app-gameboard></app-gameboard>
        <app-sticker></app-sticker>
      </section>
    </main>
  `,
  //styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Le casse tete viet!';
}