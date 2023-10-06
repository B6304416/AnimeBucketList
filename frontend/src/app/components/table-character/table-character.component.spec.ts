import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCharacterComponent } from './table-character.component';

describe('TableCharacterComponent', () => {
  let component: TableCharacterComponent;
  let fixture: ComponentFixture<TableCharacterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCharacterComponent]
    });
    fixture = TestBed.createComponent(TableCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
