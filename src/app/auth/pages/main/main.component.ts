import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    `
      div > div {
        background-image: url(../../../../assets/images/bg-01.jpg);
      }
      div#contenedor {
        background: white;
      }
    `,
  ],
})
export class MainComponent {}
