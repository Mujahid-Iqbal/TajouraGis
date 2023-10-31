import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tajoura-view',
  templateUrl: './tajoura-view.component.html',
  styleUrls: ['./tajoura-view.component.scss']
})
export class TajouraViewComponent {
  constructor(private _formBuilder: FormBuilder) { }
  firstFormGroup = this._formBuilder.group({
    schoolName: ['', Validators.required],
    schoolType: ['', Validators.required],
    studyPeriod: ['', Validators.required],
    educationalLevel: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    academicLevel: ['', Validators.required],
    libyanMales: ['', Validators.required],
    libyanFemales: ['', Validators.required],
    foreignMales: ['', Validators.required],
  });
  isLinear = false;
}
