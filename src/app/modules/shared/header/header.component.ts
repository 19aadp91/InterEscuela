import { Component } from '@angular/core';
import { CookieService } from '../../../core/services/CookieService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private cookieService: CookieService) {}

  SignOff(){
    this.cookieService.delete('appToken');
  }
}
