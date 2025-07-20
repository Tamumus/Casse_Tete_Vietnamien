import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gameboard',
  imports: [
    CommonModule
  ],
  templateUrl: './gameboard.html',
  styleUrl: './gameboard.css'
})

export class Gameboard implements OnInit{
  images: {x: number, y: number }[] = [];

  readonly imageSrc = 'Black_square.jpg'
  //When the front is booted, calculate the coords of all the tiles  then display them
  ngOnInit() {
    this.generatetilesPositions();
  }

  generatetilesPositions() {
    let i: number = 0;
    let i_width: number = 0;
    let i_lenght: number = 0;
    let x,y: number = 0;
    const spacing = 200; //this should prob be a var for scaling with screen size
  
  //We know there's three rows of five tiles vertically
  x = 0;
  while (i < 15) {
    //this build vertically a row of five
    i_lenght = 0;
    y = 0;
    while (i_lenght < 5)
    {
      x = x;
      y = i_lenght * spacing;
      this.images.push({
        x,
        y
      });
      i_lenght++;
      i++;
    }
    x = x + spacing * 2;
  }
  //Now we do the filling between the rows
  // build one tile, second column, bottom
    x = spacing
    y = spacing * 4;
    this.images.push({
      x,
      y
    });

  // build one tile , fourth column, top
    x = spacing * 3;
    y = 0;
    this.images.push({
      x,
      y
    });

  // Now the nine post-its with numbers on them

  x = spacing * 7;
  y = 0;
  i = 0;
  i_lenght = 0;
  while (i < 9) {
    //this build vertically a row of 9
    while (i_lenght < 9)
    {
      x = x;
      y = i_lenght * spacing;
      this.images.push({
        x,
        y
      });
      i_lenght++;
      i++;
    }
  }
  }
}

