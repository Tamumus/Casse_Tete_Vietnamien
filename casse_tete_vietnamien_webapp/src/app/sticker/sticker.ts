import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getScreenResolution, getViewportSize, ScreenSize} from '../helpers/get_screen_res';

@Component({
  selector: 'app-sticker',
  imports: [CommonModule],
  templateUrl: './sticker.html',
  styleUrl: './sticker.css'
})

export class Sticker implements OnInit
{
  stickers:{ src: string, x: number, y: number,draggable: boolean }[] = []; //correct class, use that when we have the image lib done
  //When the front is booted, calculate the coords of all the tiles  then display them
  readonly stickerSrc = 'Black_square.jpg'
  src = this.stickerSrc;
  ngOnInit() {this.generatestickersPositions();
  }

//We need 9 stickers in two columns . Let's reuse the idea of a 7 * scaling board in widht. We'll put a 3 * scaling padding
//most of the logic is reused from gameboard.ts
//I prefer my X and Y out of the function, it's easier to see mistakes this way

  generatestickersPositions() 
  {
    let i: number = 0; //used for a while loop
    let x,y: number = 0; //coords in pixel (mult by spacing WICH SHOULD be equal to the size of a tile in pixel)
    const spacing = 100; //this should prob be a var for scaling with screen size

    // place all the stickers (9 total)
    i = 1;
    x = spacing * 9;
    y = spacing;
    while (i < 5)
    {
      y = y;
      //src: `sticker{i + 1}.png`
      this.stickers.push({src: 'Black_square.jpg' ,x,y, draggable:true});
      i++;
      y = i * spacing;
    }

    i = 0;
    x = spacing * 10;
    y = 0;
    while (i < 5)
    {
      y = y;
      //src: `sticker{i + 1}.png`
      this.stickers.push({src: 'Black_square.jpg' ,x,y, draggable:true});
      i++;
      y = i * spacing;
    }
  }

}
