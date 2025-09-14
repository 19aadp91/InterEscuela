import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CookieService } from './core/services/CookieService';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAuthenticationInterceptor } from './core/interceptors/InjectTokenInterceptor';

const cookieService = new CookieService();


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(
      withFetch(),
      withInterceptors([provideAuthenticationInterceptor(cookieService)
      ])
    )
  ]
}; 
