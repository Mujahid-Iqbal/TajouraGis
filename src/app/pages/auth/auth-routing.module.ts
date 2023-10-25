import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  // no layout routes
  {path: 'login', component: LoginComponent},
  // { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'register',
    component: SignupComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
