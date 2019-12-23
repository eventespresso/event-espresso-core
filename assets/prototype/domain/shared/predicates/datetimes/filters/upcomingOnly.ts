const upcomingOnly = (dates: any[]) => {
	return dates.filter(({ isUpcoming }) => isUpcoming);
};

export default upcomingOnly;
