import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators'

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedReq = req.clone(
            {
                headers: req.headers.append('Auth', 'xyz')
            }
        )
        // this is what the interceptor typically does, it modifies the request/response and then returns the modified req
        return next.handle(modifiedReq).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log('response arrived. body data: ')
                console.log(event.body)
            }
        }))
    }
}