import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layaut',
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './layaut.component.html',
  styleUrl: './layaut.component.scss'
})
export class LayautComponent {

}
