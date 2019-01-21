export enum CountType {
  INCREMENT = "increment",
  DECREMENT = "decrement"
}

export class Count {
  constructor(
    public currentCount: number,
    public type: CountType,
    public timestamp: Date
  ) {}
}

export class Counter {
  constructor(
    public id: string,
    public name: string,
    public totalCount: number,
    public counts: Array<Count>,
    public lastModified: Date
  ) {}
}
