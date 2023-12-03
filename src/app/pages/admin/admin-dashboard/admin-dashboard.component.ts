import { Component, OnInit } from '@angular/core';
import { totalNominalGDP } from './data'
@Component({ 
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  totalSchools: number = 180; // Replace with actual data
  totalHospitals: number = 150; // Replace with actual data
  totalPoliceStations: number = 120; // Replace with actual data
  dataVBC = totalNominalGDP;
  viewVBC: [number, number] = [1400, this.calculateChartHeight()];
  animationsVBC = false;
  legendVBC = true;
  xAxisVBC = true;
  yAxisVBC = true;
  showYAxisLabelVBC = true;
  yAxisLabelVBC = "Amount in Trillions ($)";

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.viewVBC[1] = this.calculateChartHeight();
    });
  }
  dataLabelFormatterVBC(tooltipText: any) {
    return tooltipText;
  }
  private calculateChartHeight(): number {
    // You can adjust the percentage or use other logic as needed
    const screenHeight = window.innerHeight;
    const chartHeightPercentage = 60; // Adjust as needed
    return (screenHeight * chartHeightPercentage) / 100;
  }
}
