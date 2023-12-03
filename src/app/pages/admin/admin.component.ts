import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { DynamiccomponentserviceService } from '../../core/services/dynamic-service/dynamiccomponentservice.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TajouraDataComponent } from './tajoura-data/tajoura-data.component';
import { Router } from '@angular/router';
import { SchoolsDataService } from 'src/app/core/services/schoolDataService/schools-data.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import { UsersManagementComponent } from './users-management/users-management.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  temporaryDisabled: any = false;
  sidenavWidth = 15;
  selectedCard: number | null = 1;
  currentUSer: User
  
  constructor(public authService: AuthService, private dynamicComponentService: DynamiccomponentserviceService, private router: Router, public mapService: MapServiceService, public toastrService: ToastrService) {
    this.currentUSer = this.authService.localUser();
   }
  ngOnInit() {}

  ngAfterViewInit() {
    
    // Load your dynamic component on initialization
    this.loadDynamicComponent();
  }

  loadDynamicComponent() {
    // Replace 'YourDynamicComponent' with the actual component you want to load
    this.dynamicComponentService.loadComponent(AdminDashboardComponent, this.dynamicComponentContainer);
  }

  selectCard(cardNumber: number) {
    // debugger
    if (this.selectedCard === cardNumber) {
      this.selectedCard = null;
    } else {
      // Otherwise, open the selected card
      this.selectedCard = cardNumber;
    }
    switch (cardNumber) {
      case 2:
        this.dynamicComponentService.loadComponent(TajouraDataComponent, this.dynamicComponentContainer);
        break;
      case 6:
        this.dynamicComponentService.loadComponent(UsersManagementComponent, this.dynamicComponentContainer);
        break;
      default:
        this.dynamicComponentService.loadComponent(AdminDashboardComponent, this.dynamicComponentContainer);
        break;
    }
  }

  goBack() {
    this.router.navigate(['/']); // Replace '/' with the appropriate route
  }

  

}
