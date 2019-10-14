import set from "set-value";

import { CategoryListType } from "./index";

type TypeMetrics = {
  [key: string]: {
    "#": number;
    Name: string;
    Id: string;
    Status: string;
    Total: number;
    Page: number;
  };
};
export class StatisticsManager {
  private stats: {
    errors: Array<any>;
    metrics: TypeMetrics;
  };

  constructor() {
    this.stats = { errors: [], metrics: {} };
  }

  public addStatusUpdate(label: string, newStatus: string) {
    const path = `${label}.Status`;
    this.stats.metrics = set(this.stats.metrics, path, newStatus);
    // set(this.stats.metrics, `${label}.Page`, this.stats.metrics[label].Page + 1);
  }

  public incrementPage(label: string) {
    this.stats.metrics = set(this.stats.metrics, `${label}.Page`, this.stats.metrics[label].Page + 1);
  }

  public incrementCount(label: string, by: number) {
    this.stats.metrics = set(this.stats.metrics, `${label}.Total`, this.stats.metrics[label].Total + by);
  }

  public addError(error) {
    this.stats.errors.push(error);
  }

  public addCategory(index: number, category: CategoryListType) {
    this.stats.metrics = set(this.stats.metrics, category.label, {
      "#": index + 1,
      Name: category.label,
      Id: category.tag,
      Status: "🔵 - Pending",
      Total: 0,
      Page: 0
    });
  }

  public print(): TypeMetrics {
    return this.stats.metrics;
  }

  public printErrors(): Array<any> {
    return this.stats.errors;
  }
}
