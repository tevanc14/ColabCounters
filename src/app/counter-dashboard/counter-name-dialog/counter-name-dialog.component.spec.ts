import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CounterNameDialogComponent } from "./counter-name-dialog.component";

describe("CreateCounterDialogComponent", () => {
  let component: CounterNameDialogComponent;
  let fixture: ComponentFixture<CounterNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterNameDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
