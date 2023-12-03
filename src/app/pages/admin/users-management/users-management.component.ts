import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolsDataService } from 'src/app/core/services/schoolDataService/schools-data.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent {
  totalUsers: number = 0
  totalAdmins: number = 0
  customUser: number = 0
  isLoading: boolean = false
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['userId', 'userName', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private schoolService: SchoolsDataService) {}

  ngOnInit() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi() {
    this.isLoading = true
    this.schoolService.getAllUsers().subscribe((data: any) => {
      this.isLoading = false
      this.dataSource.data = data;
      this.totalUsers = data.length
      this.totalAdmins = data.is_staff == true ? data.length : 0
      this.customUser = data.is_staff == false ? data.length : 0
      // Count administrators and custom users
      this.totalAdmins = data.filter((user: any) => user.is_staff == true).length;
      this.customUser = data.filter((user: any) => user.is_staff == false).length;
      this.dataSource.paginator = this.paginator;
    });
  }
}
