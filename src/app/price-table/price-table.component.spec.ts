
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTableComponent } from './price-table.component';

describe('PriceTableComponent', () => {
  let component: PriceTableComponent;
  let fixture: ComponentFixture<PriceTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
