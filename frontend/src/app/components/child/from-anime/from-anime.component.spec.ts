import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromAnimeComponent } from './from-anime.component';

describe('FromAnimeComponent', () => {
  let component: FromAnimeComponent;
  let fixture: ComponentFixture<FromAnimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FromAnimeComponent]
    });
    fixture = TestBed.createComponent(FromAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
