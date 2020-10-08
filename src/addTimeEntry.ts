import fetch, { RequestInit } from "node-fetch";
import { hostname, fetchOptions } from "./settings";
import { NewTimeEntryRequest } from "./types";

async function addTimeEntry({
  started,
  originTaskId,
  comment,
  hours,
  worker
}: {
  started : Date|string,
  originTaskId: number|string,
  comment: string,
  hours: number,
  worker: string
}) {
  const postUrl = `https://${hostname}/rest/tempo-timesheets/4/worklogs`;
  const newEntry: NewTimeEntryRequest = {
    attributes: {},
    billableSeconds: hours * 60 * 60,
    originId: -1,
    worker,
    comment,
    started,
    timeSpentSeconds: hours * 60 * 60,
    originTaskId: String(originTaskId),
    remainingEstimate: null,
    endDate: null,
    includeNonWorkingDays: false,
  };
  const body = JSON.stringify(newEntry);
  //   console.log(body);
  const options: RequestInit = {
    ...fetchOptions,
    method: "POST",
    body,
  };
  const response = await fetch(postUrl, options);
  if (!response.ok) {
    console.error("Wrong Response", response);
    process.exit(1);
  }
  const json = await response.json();
  // console.log("ok", json);
}

export default addTimeEntry;
