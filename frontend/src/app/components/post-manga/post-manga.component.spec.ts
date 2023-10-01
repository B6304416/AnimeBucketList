import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMangaComponent } from './post-manga.component';

describe('PostMangaComponent', () => {
  let component: PostMangaComponent;
  let fixture: ComponentFixture<PostMangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostMangaComponent]
    });
    fixture = TestBed.createComponent(PostMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
