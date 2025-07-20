import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getScreenResolution, getViewportSize, ScreenSize} from '../helpers/get_screen_res';

//we want get viewportsize out of those (browser area we play with)

interface ImageData {
  src: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-gameboard',
  imports: [CommonModule],
  templateUrl: './gameboard.html',
  styleUrl: './gameboard.css'
})

export class Gameboard implements OnInit
{
  // images: {x: number, y: number }[] = []; TO ADD: How to dynamically change SRC for images
  images:{ src: string, x: number, y: number,draggable: boolean }[] = []; //correct class, use that when we have the image lib done
  readonly imageSrc = 'Black_square.jpg'
  src = this.imageSrc;
  //When the front is booted, calculate the coords of all the tiles  then display them
  ngOnInit() {this.generatetilesPositions();
}

//We will think of and manipulate the gameboard as a grid of width 7 (X[0-6]) and height 6 (Y[0-5])
//using that we can call images as needed to fill the board
//I prefer my X and Y out of the function, it's easier to see mistakes this way

  generatetilesPositions() 
  {
    let i: number = 0; //used for a while loop
    let x,y: number = 0; //coords in pixel (mult by spacing WICH SHOULD be equal to the size of a tile in pixel)
    const spacing = 100; //this should prob be a var for scaling with screen size

    // place all the numbers (five total)
    i = 0;
    x= 0;
    while (i < 4)
    {
      x = x;
      y = 2 * spacing; // middle of the grid, or third line
      //src: `number{i + 1}.png`, Let's not redo the whole logic to do [13 12 11 10] the clever way RN
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
      i++;
      x = x + 2 * spacing; // one column out of 2 (0,2...)
    }
    //src: `66.png`;
      x = 6 * spacing;
      y = 0 * spacing; // last line
    this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});

    // place all the : (two total)
      //src: `:.png`;
        x = 0;
        y = 5 * spacing; // last line
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 6 * spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});

    // place the = 
      //src: `=.png`;
        x = 6 * spacing; // last column
        y = spacing; // second line
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});

    // place the -: (three total)
      //src: `-.png`;
        x = 3 * spacing;
        y =0;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 4 * spacing;
        y = spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 6 * spacing;
        y = 3 * spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});

    // place the +: (four total)
      //src: `+.png`;
        x =0;
        y = spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 2 * spacing;
        y = 3 * spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 2 * spacing;
        y = 5 * spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 4 * spacing;
        y = 3 * spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});

    // place the *: (three total)
      //src: `*.png`;
        x = 0;
        y = 3 * spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 2 * spacing;
        y = spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
        x = 4 * spacing;
        y = 5 * spacing;
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
    
    //We draw the stickers
    i = 0;
    y = 0;
    x = spacing * 9;
    while (i < 9)
    {
      //src: `sticker{i + 1}.png'
      this.images.push({src: 'Black_square.jpg' ,x,y, draggable:false});
      i++;
      y = y + spacing;
    }
  }
}
