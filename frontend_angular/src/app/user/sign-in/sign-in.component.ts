import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string | undefined;

  ngOnInit(): void {
    if(this.userService.isLoggedIn()){ // if loged-in already then redirect to user profile
    this.router.navigateByUrl('/profileOfUser');
    }
  }

  
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe((res:any) => {
        this.userService.setToken(res['JWTtoken']);
        this.router.navigateByUrl('/profileOfUser'); // redirecting to profile-of-user component if all success or jwt token generated
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
