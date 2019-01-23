import { TestBed } from "@angular/core/testing";

import { CounterService } from "./counter.service";

describe("UserService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CounterService = TestBed.get(CounterService);
    expect(service).toBeTruthy();
  });
});
