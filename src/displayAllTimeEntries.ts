import Table from "cli-table3";
import weekday from './weekday';
import { TempoTimeEntry } from "./types";

export default (entries: TempoTimeEntry[]) => {
  const table = new Table({
    head: ["date", "hours", "ticket", "work"],
  });

  //   table.push(["First value", "Second value", '123']);
  entries.forEach((entry) => {
    table.push([
      `${weekday(entry.started)} ${String(entry.started).substr(0,10)}`,
      entry.timeSpent,
      `${entry.issue.key} ${entry.issue.summary}`,
      entry.comment
    ]);
  });

  console.log(table.toString());
};
