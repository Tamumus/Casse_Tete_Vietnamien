import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import {Home} from './home/home';

@Component({
  selector: 'app-root',
  imports: [Home],
  template: `
    <main>
      <header class="brand-name">
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  //styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Le casse tete viet!';
}