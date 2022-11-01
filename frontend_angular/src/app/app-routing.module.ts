import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ProfileOfUserComponent } from './profile-of-user/profile-of-user.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'signup', component: UserComponent,
  children: [{ path: '', component: SignUpComponent }]},
  { path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]},
    {
      path: 'profileOfUser', component: ProfileOfUserComponent,canActivate:[AuthGuard] // with autjGuard for private profileOfUser route so user can not access this route component without right token or authntcation
      // path: 'profileOfUser', component: ProfileOfUserComponent // for normal use without private route
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
