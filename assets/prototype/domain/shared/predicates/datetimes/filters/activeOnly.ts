const activeUpcoming = (dates: any[]) => {
	return dates.filter(({ isActive }) => isActive);
};

export default activeUpcoming;
