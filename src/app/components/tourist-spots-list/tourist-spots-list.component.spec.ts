import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristSpotsListComponent } from './tourist-spots-list.component';

describe('TouristSpotsListComponent', () => {
  let component: TouristSpotsListComponent;
  let fixture: ComponentFixture<TouristSpotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristSpotsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristSpotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
