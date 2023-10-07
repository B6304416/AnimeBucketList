import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangalistComponent } from './mangalist.component';

describe('MangalistComponent', () => {
  let component: MangalistComponent;
  let fixture: ComponentFixture<MangalistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangalistComponent]
    });
    fixture = TestBed.createComponent(MangalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
