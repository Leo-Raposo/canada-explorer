import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristSpotFormComponent } from './tourist-spot-form.component';

describe('TouristSpotFormComponent', () => {
  let component: TouristSpotFormComponent;
  let fixture: ComponentFixture<TouristSpotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristSpotFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TouristSpotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
