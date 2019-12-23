const allDates = (dates: any[]) => {
	const withoutTrashed = (date) => date.deleted;
	return dates.filter(withoutTrashed);
};

export default allDates;
