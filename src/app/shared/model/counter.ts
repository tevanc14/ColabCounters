export enum CountType {
  INCREMENT = "increment",
  DECREMENT = "decrement"
}

export enum CounterStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export class Collaborator {
  constructor(
    public userId: string,
    public canRead: boolean = false,
    public canWrite: boolean = false,
    public canShare: boolean = false
  ) {}
}

export class Count {
  constructor(
    public currentCount: number,
    public type: CountType,
    public timestamp: Date,
    public userId: string
  ) {}
}

export class Counter {
  constructor(
    public counterId: string,
    public name: string,
    public totalCount: number,
    public counts: Array<Count>,
    public lastModified: Date,
    public collaborators: Array<Collaborator>,
    public status: CounterStatus,
    public createdBy: string
  ) {}
}
