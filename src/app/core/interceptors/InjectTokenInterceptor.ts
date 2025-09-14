import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { CookieService } from "../services/CookieService";

export function provideAuthenticationInterceptor(cookieService: CookieService): HttpInterceptorFn {
  return (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
      let req = request.clone();
      const allowedOrigins = ['https://localhost:'];

      if (!!allowedOrigins.find(origin => request.url.includes(origin))) {
          let token: string = '';

          if (cookieService.check('appToken')) {
              token += `${cookieService.get('appToken')}`;
          }

          if (token) {
              req = req.clone({
                  setHeaders: {
                      'Authorizationapi': token,
                  },
              });
          }
      }

      return next(req);
  };
}