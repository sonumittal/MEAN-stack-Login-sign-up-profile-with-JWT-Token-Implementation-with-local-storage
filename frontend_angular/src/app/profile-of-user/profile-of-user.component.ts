import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile-of-user',
  templateUrl: './profile-of-user.component.html',
  styleUrls: ['./profile-of-user.component.css']
})
export class ProfileOfUserComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }
  userDetails:any;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res.user;
      },
      err => { 
        console.log(err);
        
      }
    );
  }  
  
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }



}
