export enum CountType {
  Increment = "increment",
  Decrement = "decrement"
}

export enum CounterStatus {
  Active = "active",
  Inactive = "inactive"
}

export class Collaborator {
  constructor(
    public userId: string,
    public canRead: boolean = false,
    public canWrite: boolean = false,
    public canShare: boolean = false,
    public canDelete: boolean = false
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
    public counts: Count[],
    public lastModified: Date,
    public collaborators: Collaborator[],
    public status: CounterStatus,
    public createdBy: string,
    public dateCreated: Date
  ) {}
}
