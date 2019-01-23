import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CounterDetailsDialogComponent } from "./counter-details-dialog.component";

describe("CounterDetailsDialogComponent", () => {
  let component: CounterDetailsDialogComponent;
  let fixture: ComponentFixture<CounterDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterDetailsDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
