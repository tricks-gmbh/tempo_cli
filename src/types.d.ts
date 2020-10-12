export interface TempoTimeEntry {
  billableSeconds: number;
  timeSpent: string;
  timeSpentSeconds: number;
  issue: Issue;
  tempoWorklogId: number;
  comment: string;
  location: Location;
  attributes: Attributes;
  worker: string;
  updater: string;
  started: string; /** Date */
  dateCreated: Date;
  dateUpdated: Date;
  originTaskId: number;
  originId: number;
}

interface Attributes {}

interface Issue {
  estimatedRemainingSeconds: number;
  issueStatus: string;
  issueType: string;
  projectId: number;
  projectKey: string;
  iconUrl: string;
  versions: any[];
  summary: string;
  components: number[];
  accountKey: string;
  internalIssue: boolean;
  epicName: string;
  reporterKey: string;
  key: string;
  id: number;
}

interface Location {
  name: string;
  id: number;
}

export interface NewTimeEntryRequest {
  attributes: Attributes;
  billableSeconds: number;
  originId: number;
  worker: string;
  comment: string;
  started: Date | string;
  timeSpentSeconds: number;
  originTaskId: string;
  remainingEstimate: null;
  endDate: null;
  includeNonWorkingDays: boolean;
}

export interface TempoTimeEntryByDay {
  [day: string]: TempoTimeEntry[];
}
