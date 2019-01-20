export enum CountType {
  INCREMENT = "increment",
  DECREMENT = "decrement"
}

export class Count {
  constructor(public type: CountType, public timestamp: Date) {}
}

export class Counter {
  constructor(
    public id: string,
    public name: string,
    public currentCount: number,
    public counts: Array<Count>
  ) {}
}
