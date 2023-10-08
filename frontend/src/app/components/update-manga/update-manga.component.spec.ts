import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMangaComponent } from './update-manga.component';

describe('UpdateMangaComponent', () => {
  let component: UpdateMangaComponent;
  let fixture: ComponentFixture<UpdateMangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMangaComponent]
    });
    fixture = TestBed.createComponent(UpdateMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
