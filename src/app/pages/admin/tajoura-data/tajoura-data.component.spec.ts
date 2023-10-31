import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TajouraDataComponent } from './tajoura-data.component';

describe('TajouraDataComponent', () => {
  let component: TajouraDataComponent;
  let fixture: ComponentFixture<TajouraDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TajouraDataComponent]
    });
    fixture = TestBed.createComponent(TajouraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
