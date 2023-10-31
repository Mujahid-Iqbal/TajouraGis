import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TajouraViewComponent } from './tajoura-view/tajoura-view.component';

@Component({
  selector: 'app-tajoura-data',
  templateUrl: './tajoura-data.component.html',
  styleUrls: ['./tajoura-data.component.scss']
})
export class TajouraDataComponent implements  AfterViewInit {
  displayedColumns = ['ID', 'School Name', 'viewSchool'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private http: HttpClient,public dialog: MatDialog) {
    // Create 100 users
    const jsonFile = 'assets/jsonFile/schoolData.json';
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

  editSchool(schoolId: number) {
    const dialogRef = this.dialog.open(TajouraViewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  viewSchool() {
    const dialogRef = this.dialog.open(TajouraViewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
