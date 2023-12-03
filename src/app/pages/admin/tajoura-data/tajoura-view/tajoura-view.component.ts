import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolsData } from 'src/app/core/models/user/schools';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import { SchoolsDataService } from 'src/app/core/services/schoolDataService/schools-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tajoura-view',
  templateUrl: './tajoura-view.component.html',
  styleUrls: ['./tajoura-view.component.scss']
})
export class TajouraViewComponent implements AfterViewInit{
  isLinear = false;
  formData!: SchoolsData
  formDataLevels!: SchoolsData
  firstFormGroup: FormGroup = new FormGroup({});;
  secondFormGroup: FormGroup = new FormGroup({});;
  constructor(private _formBuilder: FormBuilder, public mapService: MapServiceService, public schoolService: SchoolsDataService, public toastrService: ToastrService) { 
      this.firstFormGroup = this._formBuilder.group({
        school_name: ['', Validators.required],
        type_of_school: ['', Validators.required],
        study_period: ['', Validators.required],
        educational_level: ['', Validators.required],
        x: ['', Validators.required],
        y: ['', Validators.required],
        number_of_classes: ['', Validators.required],
        computer_lab: ['', Validators.required],
        science_lab: ['', Validators.required],
        physics_lab: ['', Validators.required],
        chemistry_lab: ['', Validators.required],
        biology_lab: ['', Validators.required],
        administrative_rooms: ['', Validators.required],
        stage: ['', Validators.required],
        mosque: ['', Validators.required],
        ambulance_room: ['', Validators.required],
        specialist_room: ['', Validators.required],
        library: ['', Validators.required],
        canteen: ['', Validators.required],
        guard_room: ['', Validators.required],
        playgrounds: ['', Validators.required],
        bathrooms: ['', Validators.required],
        academic_level:                         ['', Validators.required],
        num_libyan_males:                  ['', Validators.required],
        num_libyan_females:                ['', Validators.required],
        num_foreign_males:                 ['', Validators.required],
        num_foreign_females:               ['', Validators.required],
        num_males_special_categories:      ['', Validators.required],
        num_females_special_categories: ['', Validators.required],
        total:                                   ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        academic_level:                          ['', Validators.required],
        num_libyan_males:                  ['', Validators.required],
        num_libyan_females:                ['', Validators.required],
        num_foreign_males:                 ['', Validators.required],
        num_foreign_females:               ['', Validators.required],
        num_males_special_categories:      ['', Validators.required],
        num_females_special_categories: ['', Validators.required],
        total:                                   ['', Validators.required],
      });
      
    }
  


  ngAfterViewInit() {
  }

  createSchoolData() {
    const formData = this.firstFormGroup.value;
    this.schoolService.createSchool(formData).subscribe(
      (response) => {
        this.showSuccess('School created successfully')
        this.createLevels(response.id)
        this.schoolService.allSchool('success')
      },
      (error) => {
        this.showError('Error creating school')
      }
    );
  }

  createLevels(schoolId: any) {
    const formData = this.secondFormGroup.value;
    const secondFormDataWithSchoolId = { ...formData, school:schoolId };
    this.schoolService.createAcademicLevel(secondFormDataWithSchoolId).subscribe(
      (response) => {
        this.showSuccess('Academic level created successfully')
      },
      (error) => {
        this.showError('Error creating academic level')
      }
    );
  }

  public showError(error: any): void {
    this.toastrService.error(`${error}`);
  }

  public showSuccess(error: any): void {
    this.toastrService.success(`${error}`);
  }
}
