import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCounterDialogComponent } from './create-counter-dialog.component';

describe('CreateCounterDialogComponent', () => {
  let component: CreateCounterDialogComponent;
  let fixture: ComponentFixture<CreateCounterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCounterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCounterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
