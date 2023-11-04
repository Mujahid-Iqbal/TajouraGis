import { AfterViewInit, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SchoolsData } from 'src/app/core/models/user/schools';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';

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
  constructor(private _formBuilder: FormBuilder, public mapService: MapServiceService) { 
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
        number_of_libyan_males:                  ['', Validators.required],
        number_of_libyan_females:                ['', Validators.required],
        number_of_foreign_males:                 ['', Validators.required],
        number_of_foreign_females:               ['', Validators.required],
        number_of_males_special_categories:      ['', Validators.required],
        number_of_females_in_special_categories: ['', Validators.required],
        total:                                   ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        academic_level:                          ['', Validators.required],
        number_of_libyan_males:                  ['', Validators.required],
        number_of_libyan_females:                ['', Validators.required],
        number_of_foreign_males:                 ['', Validators.required],
        number_of_foreign_females:               ['', Validators.required],
        number_of_males_special_categories:      ['', Validators.required],
        number_of_females_in_special_categories: ['', Validators.required],
        total:                                   ['', Validators.required],
      });
      
    }
  


  ngAfterViewInit() {
    console.log('m')
    
  }
}
