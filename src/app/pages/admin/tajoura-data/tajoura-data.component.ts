import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TajouraViewComponent } from './tajoura-view/tajoura-view.component';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import { ViewSchoolComponent } from './view-school/view-school.component';

@Component({
  selector: 'app-tajoura-data',
  templateUrl: './tajoura-data.component.html',
  styleUrls: ['./tajoura-data.component.scss']
})
export class TajouraDataComponent implements  AfterViewInit {
  totalSchools: number = 180; // Replace with actual data
  totalHospitals: number = 150; // Replace with actual data
  totalPoliceStations: number = 120; // Replace with actual data
  displayedColumns = ['ID', 'School Name', 'viewSchool'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private http: HttpClient,public dialog: MatDialog, private mapService: MapServiceService) {
    // Create 100 users
    const jsonFile = 'assets/jsonFile/finalData.json';
    this.http.get(jsonFile).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
    });

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);

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

  deleteSchool(schools: any) {
  }
}
