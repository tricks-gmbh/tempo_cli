import Table from "cli-table3";
import weekday from "./weekday";
import { TempoTimeEntry, TempoTimeEntryByDay } from "./types";

export default (entries: TempoTimeEntry[]) => {
  const table = new Table({
    head: ["date", "hours", "ticket", "work", "total"],
  });

  Object.entries(
    entries
      .map((entry) => ({
        ...entry,
        // started:
        startedFormated: `${weekday(entry.started)} ${String(
          entry.started
        ).substr(0, 10)}`,
      }))
      .reduce(
        (prev: TempoTimeEntryByDay, entry) => ({
          ...prev,
          [entry.startedFormated]: [
            ...(prev[entry.startedFormated] ?? []),
            entry,
          ],
        }),
        {}
      )
  ).forEach(([day, entries]) => {
    entries.forEach((entry, index) => {
      const everyEntryCol = [
        entry.timeSpent,
        `${entry.issue.key} ${entry.issue.summary.substr(0, 40)}`,
        entry.comment,
      ];
      if (index !== 0) {
        return table.push(everyEntryCol);
      }
      table.push([
        { content: day, rowSpan: entries.length },
        ...everyEntryCol,
        {
          content: `${
            entries
              .map((e) => e.billableSeconds)
              .reduce((pv, cv) => pv + cv, 0) / 3600
          }h`,
          rowSpan: entries.length,
        },
      ]);
    });
  });
  // entries.forEach((entry) => {
  //   table.push([
  //     `${weekday(entry.started)} ${String(entry.started).substr(0, 10)}`,
  //     entry.timeSpent,
  //     `${entry.issue.key} ${entry.issue.summary}`,
  //     entry.comment,
  //   ]);
  // });

  console.log(table.toString());
};
