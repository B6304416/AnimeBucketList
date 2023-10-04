import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharecterlistComponent } from './charecterlist.component';

describe('CharecterlistComponent', () => {
  let component: CharecterlistComponent;
  let fixture: ComponentFixture<CharecterlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharecterlistComponent]
    });
    fixture = TestBed.createComponent(CharecterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
