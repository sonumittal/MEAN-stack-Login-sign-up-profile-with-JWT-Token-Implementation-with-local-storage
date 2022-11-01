import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service'; // for injecting user class service for using property of selectedUser
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  userService1:any = this.userService; 
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  SucessMessage: boolean | undefined;
  serverErrorMessages: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) { // type ngForm for getting all form fields values on submit
    this.userService.postRequestForNewUser(form.value).subscribe( res => {
        this.SucessMessage = true;
        setTimeout(() => this.SucessMessage = false, 5000); // hiding success message after 5 seconds
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) { // port 422 is already setted in the backend for any server error
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
