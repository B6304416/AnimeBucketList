import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCharacterComponent } from './post-character.component';

describe('PostCharacterComponent', () => {
  let component: PostCharacterComponent;
  let fixture: ComponentFixture<PostCharacterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCharacterComponent]
    });
    fixture = TestBed.createComponent(PostCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
