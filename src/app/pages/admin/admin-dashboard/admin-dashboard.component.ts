import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { totalNominalGDP } from './data'
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { SchoolsDataService } from 'src/app/core/services/schoolDataService/schools-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({ 
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  // dataVBC = totalNominalGDP;
  calculateData: any
  viewVBC: [number, number] = [1400, this.calculateChartHeight()];
  animationsVBC = false;
  legendVBC = true;
  xAxisVBC = true;
  yAxisVBC = true;
  showYAxisLabelVBC = true;
  isLoading: boolean = false
  totalSchools: number = 0
  // yAxisLabelVBC = "Amount in Trillions ($)";

  constructor(private cdr: ChangeDetectorRef, public schoolService: SchoolsDataService, public toastrService: ToastrService) {
    this.getScools()
  }

  ngOnInit(): void {}

  getScools() {
    this.isLoading = true;
    this.schoolService.getAllSchools().pipe(
      tap((data: any) => {
        this.isLoading = false;
        this.totalSchools = data.length
        this.calculateData = this.updateValue("المدارس", this.totalSchools);
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

  ngAfterViewInit():void {
    window.addEventListener('resize', () => {
      this.viewVBC[1] = this.calculateChartHeight();
    });
    setTimeout(() => {
      this.calculateData = totalNominalGDP
      // Trigger change detection manually after data is available
     
      this.cdr.detectChanges();
    }, 0);
  }
  dataLabelFormatterVBC(tooltipText: any) {
    return tooltipText;
  }
  private calculateChartHeight(): number {
    // You can adjust the percentage or use other logic as needed
    const screenHeight = window.innerHeight;
    const chartHeightPercentage = 65; // Adjust as needed
    return (screenHeight * chartHeightPercentage) / 100;
  }

  updateValue(name: string, newValue: number): typeof totalNominalGDP {
    const updatedArray = totalNominalGDP.map(item => {
        if (item.name === name) {
            return { ...item, value: newValue };
        }
        return item;
    });

    const targetObject = updatedArray.find(item => item.name === name);

    if (targetObject) {
        console.log(`${name} value updated to ${newValue}`);
    } else {
        console.error(`Object with name ${name} not found`);
    }

    return updatedArray;
  }

  public showError(error: any): void {
    this.toastrService.error(`${error}`);
  }
}
