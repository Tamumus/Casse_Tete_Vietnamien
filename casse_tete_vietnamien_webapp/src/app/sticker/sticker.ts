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
  stickers:{ src: string, x: number, y: number }[] = []; //correct class, use that when we have the image lib done
  //When the front is booted, calculate the coords of all the tiles  then display them
  zones = [ //TO DO: Recode this crap using scaling
  { x: 0, y: 0, width: 100, height: 100 },
  { x: 0, y: 400, width: 100, height: 100 },
  { x: 100, y: 500, width: 100, height: 100 },
  { x: 200, y: 400, width: 100, height: 100 },
  { x: 200, y: 0, width: 100, height: 100 },
  { x: 400, y: 0, width: 100, height: 100 },
  { x: 400, y: 400, width: 100, height: 100 },
  { x: 500, y: 500, width: 100, height: 100 },
  { x: 600, y: 400, width: 100, height: 100 }
  ];
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
      this.stickers.push({src: 'Black_square.jpg' ,x,y});
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
      this.stickers.push({src: 'Black_square.jpg' ,x,y});
      i++;
      y = i * spacing;
    }
  }

  
  //All the logic below allows us to detect when stickers collides with the interactive zones
  selectedsticker: any = null;
  offsetX: number = 0;
  offsetY: number = 0;

  startDrag(event: MouseEvent, sticker: any) 
  {
    event.preventDefault(); // ⛔ stop native drag
    this.selectedsticker= sticker;
    this.offsetX = event.clientX - sticker.x;
    this.offsetY = event.clientY - sticker.y;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.stopDrag);
  }

  onMouseMove = (event: MouseEvent) => {
    if (this.selectedsticker) 
    {
      this.selectedsticker.x = event.clientX - this.offsetX;
      this.selectedsticker.y = event.clientY - this.offsetY;
    }

  }

  stopDrag = () => {
    for (const zone of this.zones) 
      {
        if (this.isInZone(this.selectedsticker, zone)) 
        {
          // Snap to center of the zone
          this.selectedsticker.x = zone.x + zone.width / 2 - 50; // Assuming image is 100x100
          this.selectedsticker.y = zone.y + zone.height / 2 - 50;
          break; // Stop at the first matching zone
        }
      }
    this.selectedsticker = null;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.stopDrag);
  }
  isInZone(sticker: any, zone: any): boolean {
  const width = 100;
  const height = 100;
  return !(
    sticker.x + width < zone.x ||
    sticker.x > zone.x + zone.width ||
    sticker.y + height < zone.y ||
    sticker.y > zone.y + zone.height
  );
  }
}
