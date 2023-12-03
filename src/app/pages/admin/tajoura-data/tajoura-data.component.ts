import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TajouraViewComponent } from './tajoura-view/tajoura-view.component';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import { ViewSchoolComponent } from './view-school/view-school.component';
import { SchoolsDataService } from 'src/app/core/services/schoolDataService/schools-data.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tajoura-data',
  templateUrl: './tajoura-data.component.html',
  styleUrls: ['./tajoura-data.component.scss']
})
export class TajouraDataComponent implements  AfterViewInit {
  totalSchools: number = 0; // Replace with actual data
  totalHospitals: number = 150; // Replace with actual data
  totalPoliceStations: number = 120; // Replace with actual data
  isLoading: boolean = false;
  displayedColumns = ['id', 'School Name', 'viewSchool'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private schoolService: SchoolsDataService, public toastrService: ToastrService) {
    // Create 100 users

    this.schoolService.getAllSchool.subscribe((res: any) => {
      if(res === 'success') {
        this.getScools()
      }
    })
    this.getScools()
  }

  getScools() {
    this.isLoading = true;
    this.schoolService.getAllSchools().pipe(
      tap((data: any) => {
        this.isLoading = false;
        this.totalSchools = data.length
        this.schoolService.totalAllSchools = data.length
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
    ).subscribe(
      (response) => {
        console.log('Academic level created successfully')
      },
      (error) => {
        this.isLoading = false;
        this.showError('Something Went Wrong')
      }
    );
  }
  ngAfterViewInit() {
    // console.log 
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addSchool() {
    const dialogRef = this.dialog.open(TajouraViewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  viewSchool(school: any) {
    console.log('view', school )
    const dialogRef = this.dialog.open(ViewSchoolComponent, {
      data: school
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editSchool(schools: any) {
  }

  deleteSchool(schoolId: any) {
    this.schoolService.deleteSchools(schoolId).subscribe((res) => {
      this.getScools()
    })
  }
  public showError(error: any): void {
    this.toastrService.error(`${error}`);
  }
}
