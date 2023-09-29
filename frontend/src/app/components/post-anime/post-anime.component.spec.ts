import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnimeComponent } from './post-anime.component';

describe('PostAnimeComponent', () => {
  let component: PostAnimeComponent;
  let fixture: ComponentFixture<PostAnimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostAnimeComponent]
    });
    fixture = TestBed.createComponent(PostAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
