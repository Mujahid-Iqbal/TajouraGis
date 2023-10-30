import { Component } from '@angular/core';
import { AuthService } from './core/services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tajouraGis';
  isUser: boolean = false
  constructor(private authService: AuthService) { 
     this.isUser = this.authService.isLoggedIn()
  }
}
