import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  temporaryDisabled: any = false;
  sidenavWidth = 4;
  selectedCard: number | null = 1;
  currentUSer: User
  constructor(public authService: AuthService) {
    this.currentUSer = this.authService.localUser();
   }
  ngOnInit() {}

  selectCard(cardNumber: number) {
    if (this.selectedCard === cardNumber) {
      this.selectedCard = null;
    } else {
      // Otherwise, open the selected card
      this.selectedCard = cardNumber;
    }
  }
}
