const YEAR_IN_MILLISECONDS = 3.154e10;
const MONTH_IN_MILLISECONDS = 2.628e9;
const DAY_IN_MILLISECONDS = 8.64e7;
const HOUR_IN_MILLISECONDS = 3.6e6;
const MINUTE_IN_MILLISECONDS = 60000;
const SECONDS_IN_MILLISECONDS = 1000;
export const getTimeDiff = (milliseconds: number) => {
	const CURRENT_DATE = new Date();
	let dateDiff = CURRENT_DATE.getTime() - milliseconds;
	let timeNumber;
	let timeWord;
	if (dateDiff > YEAR_IN_MILLISECONDS) {
		timeNumber = Math.floor(dateDiff / YEAR_IN_MILLISECONDS);
		if (timeNumber > 1) {
			timeWord = "years";
		} else {
			timeWord = "year";
		}
	} else if (dateDiff > MONTH_IN_MILLISECONDS) {
		timeNumber = Math.floor(dateDiff / MONTH_IN_MILLISECONDS);
		if (timeNumber > 1) {
			timeWord = "months";
		} else {
			timeWord = "month";
		}
	} else if (dateDiff > DAY_IN_MILLISECONDS) {
		timeNumber = Math.floor(dateDiff / DAY_IN_MILLISECONDS);
		if (timeNumber > 1) {
			timeWord = "days";
		} else {
			timeWord = "day";
		}
	} else if (dateDiff > HOUR_IN_MILLISECONDS) {
		timeNumber = Math.floor(dateDiff / HOUR_IN_MILLISECONDS);
		if (timeNumber > 1) {
			timeWord = "hours";
		} else {
			timeWord = "hour";
		}
	} else if (dateDiff > MINUTE_IN_MILLISECONDS) {
		timeNumber = Math.floor(dateDiff / MINUTE_IN_MILLISECONDS);
		if (timeNumber > 1) {
			timeWord = "minutes";
		} else {
			timeWord = "minute";
		}
	} else if (dateDiff > SECONDS_IN_MILLISECONDS) {
		timeNumber = Math.floor(dateDiff / SECONDS_IN_MILLISECONDS);
		if (timeNumber > 1) {
			timeWord = "seconds";
		} else {
			timeWord = "second";
		}
	}
	return { timeNumber, timeWord };
};
