//---using this file: it is defficult to add jwt token on every private route if there are many routes so with HttpInterceptor, clint application has a common way fot adding jwt token to request header

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserService } from "../shared/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : UserService,private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) { // all the requests from this appliction will be goes through with this interceptor function 

        if (req.headers.get('noauth')){ // for normal route without token like sign-in, signup cz dont need of token to acess of sign-in and sign-up API these are not private api
            return next.handle(req.clone()); 
        }
        else { // for secure route with right token for acess private api with token
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken()) 
            });
            return next.handle(clonedreq).pipe( // for checking errors
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) { // if jwt authentication if failed
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}
