import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimereviewComponent } from './animereview.component';

describe('AnimereviewComponent', () => {
  let component: AnimereviewComponent;
  let fixture: ComponentFixture<AnimereviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimereviewComponent]
    });
    fixture = TestBed.createComponent(AnimereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
