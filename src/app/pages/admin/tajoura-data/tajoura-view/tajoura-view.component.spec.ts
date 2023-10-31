import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TajouraViewComponent } from './tajoura-view.component';

describe('TajouraViewComponent', () => {
  let component: TajouraViewComponent;
  let fixture: ComponentFixture<TajouraViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TajouraViewComponent]
    });
    fixture = TestBed.createComponent(TajouraViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
