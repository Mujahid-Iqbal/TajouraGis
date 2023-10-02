import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByComponent } from './near-by.component';

describe('NearByComponent', () => {
  let component: NearByComponent;
  let fixture: ComponentFixture<NearByComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearByComponent]
    });
    fixture = TestBed.createComponent(NearByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
