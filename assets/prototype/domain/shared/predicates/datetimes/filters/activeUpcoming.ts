const activeUpcoming = (dates: any[]) => {
	return dates.filter(({ isActive, isUpcoming }) => isActive || isUpcoming);
};

export default activeUpcoming;
