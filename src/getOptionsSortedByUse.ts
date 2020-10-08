import { TempoTimeEntry } from "./types";

export default (
  entries: TempoTimeEntry[],
  optionsCallback: (entry: TempoTimeEntry) => { name?: string; value: number }
) => {
  return Object.values(
    entries.reduce<{
      [pid: string]: { count: number; name: string; value: number };
    }>(
      (prev, entry) => ({
        ...prev,
        [entry.issue.id]: {
          ...optionsCallback(entry),
          count:
            ((prev[entry.issue.id] && prev[entry.issue.id].count) || 0) + 1,
        },
      }),
      {}
    )
  ).sort((a, b) => (a.count > b.count ? -1 : 1));
};
