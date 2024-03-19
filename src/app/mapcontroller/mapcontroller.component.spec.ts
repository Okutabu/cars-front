import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapcontrollerComponent } from './mapcontroller.component';

describe('MapcontrollerComponent', () => {
  let component: MapcontrollerComponent;
  let fixture: ComponentFixture<MapcontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapcontrollerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
