import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBookComponent } from './current-book.component';

describe('CurrentBookComponent', () => {
  let component: CurrentBookComponent;
  let fixture: ComponentFixture<CurrentBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentBookComponent]
    });
    fixture = TestBed.createComponent(CurrentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
