import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangareviewComponent } from './mangareview.component';

describe('MangareviewComponent', () => {
  let component: MangareviewComponent;
  let fixture: ComponentFixture<MangareviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangareviewComponent]
    });
    fixture = TestBed.createComponent(MangareviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
