import { Injectable } from '@angular/core';

//used for the sound effects of the stickers and victory/defeat
@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private playSound(src: string): void {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play().catch(e => console.warn("Erreur lors de la lecture du son :", e));
  }

  playShakeSound(): void {
    this.playSound('cant_slide.mp3');
  }

  playSlideInSound(): void {
    this.playSound('slide_in_place.mp3');
  }

  playVictorySound(): void {
    this.playSound('victory_tune.mp3')
  }
  
  playDefeatSound(): void {
    this.playSound('defeat_tune.mp3')
  }


}