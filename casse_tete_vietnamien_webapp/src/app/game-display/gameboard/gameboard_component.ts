import { Component, OnInit,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameboardData } from './gameboard';

//we want get viewportsize out of those (browser area we play with)

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gameboard.html',
  styleUrls: ['./gameboard.css']
})

export class GameboardComponent implements OnInit
{
  @Input() boardHeight: number = 600; 
  @Input() boardWidth: number = 700;
  @Input() scaleFactor: number = 1; //1 so we don't mult scaling by zero in case zomething breaks in gamedisplay.ts
  @Input() boardHeightOffset: number = 0;
  @Input() boardWidthOffset: number = 0;

  // images: {x: number, y: number }[] = []; TO ADD: How to dynamically change SRC for images
  images:{ src: string, x: number, y: number,draggable: boolean, label?: string, labelClass?: string, rotation?:number, cssClass?: string}[] = []; //correct class, use that when we have the image lib done
  readonly imageSrc = 'tile_black2.jpg'
  src = this.imageSrc;
  //When the front is booted, calculate the coords of all the tiles  then display them
  ngOnInit() {this.generatetilesPositions();
  console.log('--- GAMEBOARD INIT ---');
  console.log('boardWidthOffset:', this.boardWidthOffset);
  console.log('boardHeightOffset:', this.boardHeightOffset);
  console.log('scaleFactor:', this.scaleFactor);
}

//We will think of and manipulate the gameboard as a grid of width 7 (X[0-6]) and height 6 (Y[0-5])
//using that we can call images as needed to fill the board

  generatetilesPositions() 
  {
    let i: number = 0; //used for a while loop
    let x,y: number = 0; //coords in pixel 
    const spacing = 100 * this.scaleFactor; //so it scale with the screen size

    // place all the numbers (five total)
    i = 0;
    x= 0 + this.boardWidthOffset;
    while (i < 4)
    {
      x = x;
      y = 2 * spacing + this.boardHeightOffset; // middle of the grid, or third line
    this.images.push({src: 'tile_white.jpg' ,x,y, draggable:false, 
      label: 'WIP',labelClass: 'tile-label label-small label-black', 
      rotation: this.rotatetile(), cssClass: 'tile-image tile-image-black'});
      i++;
      x = x + (2 * spacing); // one column out of 2 (0,2...)
    }
      x = 6 * spacing + this.boardWidthOffset;
      y = 0 * spacing + this.boardHeightOffset; // last line
    this.images.push({src: 'tile_white.jpg' ,x,y, draggable:false,
      label: '66',labelClass: 'tile-label label-large label-red', 
      rotation: this.rotatetile(), cssClass: 'tile-image tile-image-black'});

    // place all the : (two total)
        x = 0 + this.boardWidthOffset;
        y = 5 * spacing + this.boardHeightOffset; // last line
      this.images.push({src: this.imageSrc ,x,y, draggable:false,
        label: '/',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'});
        x = 6 * spacing + this.boardWidthOffset;
      this.images.push({src: this.imageSrc ,x,y, draggable:false, 
        label: '/',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'});

    // place the = 
        x = 6 * spacing + this.boardWidthOffset; // last column
        y = spacing + this.boardHeightOffset; // second line
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false, 
        label: '=',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });

    // place the -: (three total)
        x = 3 * spacing + this.boardWidthOffset;
        y = 0 + this.boardHeightOffset;
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: '-',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });
        x = 4 * spacing + this.boardWidthOffset;
        y = spacing + this.boardHeightOffset;
      this.images.push({src: this.imageSrc ,x,y, draggable:false,
        label: '-',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });
        x = 6 * spacing + this.boardWidthOffset;
        y = 3 * spacing + this.boardHeightOffset; 
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: '-',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });

    // place the +: (four total)
        x =0 + this.boardWidthOffset;
        y = spacing + this.boardHeightOffset;
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: '+',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });
        x = 2 * spacing + this.boardWidthOffset;
        y = 3 * spacing + this.boardHeightOffset;
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: '+',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });
        x = 2 * spacing + this.boardWidthOffset;
        y = 5 * spacing + this.boardHeightOffset;
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: '+',labelClass: 'tile-label label-small label-white',
         rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
        });
        x = 4 * spacing + this.boardWidthOffset;
        y = 3 * spacing + this.boardHeightOffset;
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,label: '+',
        labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });

    // place the *: (three total)
        x = 0 + this.boardWidthOffset;
        y = 3 * spacing + this.boardHeightOffset;
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: 'X',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });
        x = 2 * spacing + this.boardWidthOffset;
        y = spacing + this.boardHeightOffset; 
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: 'X',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });
        x = 4 * spacing + this.boardWidthOffset;
        y = 5 * spacing + this.boardHeightOffset;
      this.images.push({
        src: this.imageSrc ,x,y, draggable:false,
        label: 'X',labelClass: 'tile-label label-small label-white', 
        rotation: this.rotatetile(), cssClass: 'tile-image tile-image-white'
      });
  }
  //Beautify the board a bit by rotating the tiles around. So it's a bit less boring after looking at those two tiles for hours
  rotatetile(min: number = -20, max: number = 20): number {
  const allowedRotations = [90, 180, 0, 270, 360];
  const index = Math.floor(Math.random() * allowedRotations.length);
  return allowedRotations[index];
  }
}