import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristSpotDetailComponent } from './tourist-spot-detail.component';

describe('TouristSpotDetailComponent', () => {
  let component: TouristSpotDetailComponent;
  let fixture: ComponentFixture<TouristSpotDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristSpotDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristSpotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
