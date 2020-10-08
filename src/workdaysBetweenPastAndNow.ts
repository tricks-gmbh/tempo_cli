import { isHoliday, Region } from "feiertagejs";
import { region } from './settings';

function getDaysArray(start: Date, end: Date) {
  const arr = [];
  const dt = new Date(start);
  for (; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}

function arrayOfDaysBetweenPastAndNow(pastDate: Date | string) {
  const daylist = getDaysArray(new Date(pastDate), new Date());
  console.log(daylist);
  daylist.map((v) => v.toISOString().slice(0, 10)).join("");
  return daylist;
}

const isWeekend = (date: Date) => date.getDay() === 6 || date.getDay() === 0;

export default (past: Date | string) =>
  arrayOfDaysBetweenPastAndNow(past)
    .filter((d) => !isWeekend(d) && (!region || !isHoliday(d, <Region>region)))
    .map((d) => d.toISOString().substr(0, 10))
    .reverse();
