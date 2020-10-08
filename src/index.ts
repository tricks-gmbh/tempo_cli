require("dotenv").config();

import getTimeEntries from './getTimeEntries';
import displayAllTimeEntries from './displayAllTimeEntries'
import workdaysBetweenPastAndNow from "./workdaysBetweenPastAndNow";
import addTimeEntry from './addTimeEntry'
import weekday from "./weekday";
import getOptionsSortedByUse from './getOptionsSortedByUse'
const inquirer = require("inquirer");

async function main() {

  let entries = await getTimeEntries();
  displayAllTimeEntries(entries);
  let again;

  do {

    const lastTimeEntry = entries[entries.length - 1]
    const lastDate = String(lastTimeEntry.started).substr(0,10);


    const tickets = getOptionsSortedByUse(entries, (entry) => ({
      name: `${entry.issue.key} ${entry.issue.summary}`,
      value: entry.issue.id,
    }));

    const ticketValues: {
      started: Date;
      originTaskId: number;
    } = await inquirer.prompt([
      {
        name: "started",
        message: "Day",
        type: "list",
        choices: workdaysBetweenPastAndNow(lastDate).map((d) => ({
          name: `${weekday(d)} ${d}`,
          value: d,
        })),
      },
      {
        name: "originTaskId",
        message: "Ticket",
        type: "list",
        choices: tickets,
      },
    ]);
    const lastTicketTimeEntry = entries.reverse().find(entry => entry.issue.id === ticketValues.originTaskId)
    console.log(lastTicketTimeEntry?.comment);

    const timeValues: {
      comment: string;
      hours: number;
    } = await inquirer.prompt([
      {
        name: "comment",
        message: "Comment",
        type: "input",
        default: lastTicketTimeEntry?.comment
      },
      {
        name: "hours",
        message: "Hours",
        type: "number",
        default: (lastTicketTimeEntry?.billableSeconds ?? 3600)  / 60 / 60
      }
    ]);
    await addTimeEntry({
      ...ticketValues,
      ...timeValues,
      worker: lastTimeEntry.worker
    });

    entries = await getTimeEntries();
    displayAllTimeEntries(entries);

    const { doAgain } = await inquirer.prompt([
      {
        name: "doAgain",
        message: "Add more TimeEntries?",
        type: "confirm",
        default: false,
      },
    ]);
    again = doAgain;

  } while (again)
}

main();
