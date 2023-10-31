import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
     private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.GetUser().pipe(first())
    .subscribe((user: any) => {
      console.log(user)
      
    })
  }

  
}
