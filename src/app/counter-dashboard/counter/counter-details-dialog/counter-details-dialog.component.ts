import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Count, Counter, CountType } from "src/app/shared/model/counter";
import { User } from "src/app/shared/model/user";
import { UserService } from "src/app/shared/service/user/user.service";

export interface DialogData {
  counter: Counter;
}

@Component({
  selector: "app-counter-details-dialog",
  templateUrl: "./counter-details-dialog.component.html",
  styleUrls: ["./counter-details-dialog.component.scss"]
})
export class CounterDetailsDialogComponent implements OnInit {
  public counter: Counter;
  public cumulativeCounts: any = [];
  public dailyCounts: any = [];
  public userCounts: any = [];

  public view: number[] = [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public colorScheme = {
    name: "cool",
    selectable: true,
    group: "Ordinal",
    domain: [
      "#a8385d",
      "#7aa3e5",
      "#a27ea8",
      "#aae3f5",
      "#adcded",
      "#a95963",
      "#8796c0",
      "#7ed3ed",
      "#50abcc",
      "#ad6886"
    ]
  };

  private userMap = {};

  constructor(
    public dialogRef: MatDialogRef<CounterDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService
  ) {
    this.counter = data.counter;
    this.buildCumulativeCounts();
    this.buildDailyCounts();
    this.buildCountsPerUser();
  }

  ngOnInit(): void {}

  hasCounts(): boolean {
    return this.counter.counts.length > 0;
  }

  buildCumulativeCounts(): void {
    this.cumulativeCounts.push({ name: this.counter.name, series: [] });
    this.counter.counts.forEach(count => {
      this.cumulativeCounts[0].series.push({
        name: this.timestampToDateString(count.timestamp),
        value: count.currentCount
      });
    });
  }

  buildDailyCounts(): void {
    const dateBuckets: any = this.buildDateBuckets();
    this.extractDailyCountsFromObject(dateBuckets);
  }

  buildDateBuckets(): void {
    const dateBuckets: any = {};
    this.counter.counts.forEach((count: Count) => {
      const dateString = this.timestampToDateString(count.timestamp);

      if (!dateBuckets[dateString]) {
        dateBuckets[dateString] = 0;
      }

      dateBuckets[dateString] += this.discernCountOperation(count);
    });

    return dateBuckets;
  }

  discernCountOperation(count: Count): number {
    if (count.type === CountType.Increment) {
      return 1;
    } else if (count.type === CountType.Decrement) {
      return -1;
    } else {
      return 0;
    }
  }

  extractDailyCountsFromObject(dateBuckets: []): void {
    for (const key in dateBuckets) {
      if (dateBuckets.hasOwnProperty(key)) {
        this.dailyCounts.push({
          name: key,
          value: dateBuckets[key]
        });
      }
    }
  }

  buildCountsPerUser(): void {
    this.getUserIdMap();
    const userCountBuckets: any = this.buildUserCountBuckets();
    this.extractUserCountsFromObject(userCountBuckets);
  }

  buildUserCountBuckets(): any {
    const userCountBuckets: any = {};
    this.counter.counts.forEach((count: Count) => {
      const emailAddress = this.userMap[count.userId];

      if (!userCountBuckets[emailAddress]) {
        userCountBuckets[emailAddress] = 0;
      }

      userCountBuckets[emailAddress] += this.discernCountOperation(count);
    });
    return userCountBuckets;
  }

  extractUserCountsFromObject(userCountBuckets): void {
    for (const key in userCountBuckets) {
      if (userCountBuckets.hasOwnProperty(key)) {
        this.userCounts.push({
          name: key,
          value: userCountBuckets[key]
        });
      }
    }
  }

  getUserIdMap(): void {
    this.userService.users$.subscribe((users: User[]) => {
      for (const user of users) {
        this.userMap[user.userId] = user.emailAddress;
      }
    });
  }

  timestampToDateString(timestamp: any): string {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
}
