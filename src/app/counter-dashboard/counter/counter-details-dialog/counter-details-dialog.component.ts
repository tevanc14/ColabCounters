import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Counter, Count, CountType } from "src/app/shared/model/counter";

export interface DialogData {
  counter: Counter;
}

@Component({
  selector: "app-counter-details-dialog",
  templateUrl: "./counter-details-dialog.component.html",
  styleUrls: ["./counter-details-dialog.component.scss"]
})
export class CounterDetailsDialogComponent implements OnInit {
  counter: Counter;
  cumulativeCounts: any = [];
  dailyCounts: any = [];

  view: number[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  colorScheme = {
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

  constructor(
    public dialogRef: MatDialogRef<CounterDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.counter = data.counter;
    this.buildCumulativeCounts();
    this.buildDailyCounts();
  }

  ngOnInit() {}

  hasCounts(): boolean {
    return this.counter.counts.length > 0;
  }

  buildCumulativeCounts() {
    this.cumulativeCounts.push({ name: this.counter.name, series: [] });
    this.counter.counts.forEach(count => {
      this.cumulativeCounts[0].series.push({
        name: this.timestampToDateString(count.timestamp),
        value: count.currentCount
      });
    });
  }

  buildDailyCounts() {
    const dateBuckets: any = this.buildDateBuckets();
    this.extractDailyCountsFromObject(dateBuckets);
  }

  buildDateBuckets() {
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

  extractDailyCountsFromObject(dateBuckets: []) {
    for (const key in dateBuckets) {
      if (dateBuckets.hasOwnProperty(key)) {
        this.dailyCounts.push({
          name: key,
          value: dateBuckets[key]
        });
      }
    }
  }

  timestampToDateString(timestamp: any): string {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
}
