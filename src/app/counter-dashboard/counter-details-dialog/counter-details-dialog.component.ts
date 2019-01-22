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
  view: number[] = [700, 400];

  cumulativeCounts: any = [];
  dailyCounts: any = [];

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
    this.buildCumulativeCounts();
    this.buildDailyCounts();
  }

  ngOnInit() {}

  buildCumulativeCounts() {
    this.cumulativeCounts.push({ name: this.data.counter.name, series: [] });
    this.data.counter.counts.forEach(count => {
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
    this.data.counter.counts.forEach((count: Count) => {
      const dateString = this.timestampToDateString(count.timestamp);

      if (!dateBuckets[dateString]) {
        dateBuckets[dateString] = 0;
      }

      dateBuckets[dateString] += this.discernCountOperation(count);
    });

    return dateBuckets;
  }

  discernCountOperation(count: Count): number {
    if (count.type === CountType.INCREMENT) {
      return 1;
    } else if (count.type === CountType.DECREMENT) {
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

  timestampToDateString(timestamp: any) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
}
