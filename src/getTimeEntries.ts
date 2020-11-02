import fetch, { RequestInit } from "node-fetch";
import { hostname, fetchOptions } from "./settings";
import { TempoTimeEntry } from "./types";

function getFromTo() {
  const beforeTwoWeeks = new Date(
    new Date().getTime() - 60 * 60 * 24 * 14 * 1000
  );
  const day = beforeTwoWeeks.getDay();
  const diffToMonday = beforeTwoWeeks.getDate() - day + (day === 0 ? -6 : 1);
  const mondayOfTwoWeeks = new Date(beforeTwoWeeks.setDate(diffToMonday));
  const from = mondayOfTwoWeeks.toISOString().substr(0, 10);

  const to = new Date().toISOString().substr(0, 10);
  return { from, to };
}

// // curl https://{JIRA_URL}/rest/tempo-timesheets/4/worklogs/search -H 'Content-Type: application/json' -i -u username:password --data-binary '{"from":"2020-10-01","to":"2020-10-31"}'
async function getTimeEntries() {
  const { from, to } = getFromTo();
  const worklogUrl = `https://${hostname}/rest/tempo-timesheets/4/worklogs/search`;
  const request = {
    from,
    to,
  };
  const body = JSON.stringify(request);
  const options: RequestInit = {
    ...fetchOptions,
    method: "POST",
    body,
  };
  const response = await fetch(worklogUrl, options);
  if (!response.ok) {
    console.error(
      "Response not ok, Credentials correct? :/",
      response.statusText,
      response.status
    );
    process.exit(1);
  }
  const json: TempoTimeEntry[] = await response.json();
  return json;
}

export default getTimeEntries;
