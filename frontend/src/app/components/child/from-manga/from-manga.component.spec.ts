import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromMangaComponent } from './from-manga.component';

describe('FromMangaComponent', () => {
  let component: FromMangaComponent;
  let fixture: ComponentFixture<FromMangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FromMangaComponent]
    });
    fixture = TestBed.createComponent(FromMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
