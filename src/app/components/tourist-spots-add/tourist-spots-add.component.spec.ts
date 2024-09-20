import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristSpotsAddComponent } from './tourist-spots-add.component';

describe('TouristSpotsAddComponent', () => {
  let component: TouristSpotsAddComponent;
  let fixture: ComponentFixture<TouristSpotsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristSpotsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristSpotsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
