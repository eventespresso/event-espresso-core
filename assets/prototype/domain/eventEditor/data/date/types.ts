export enum DatesSortedBy {
	chronologically = 'chronologically',
	byName = 'byName',
	byId = 'byId',
	byOrder = 'byOrder',
}

export enum DisplayDates {
	start = 'start',
	end = 'end',
	both = 'both',
}

export enum ShowDates {
	activeUpcoming = 'activeUpcoming',
	activeOnly = 'activeOnly',
	above90Capacity = 'above90Capacity',
	above75Capacity = 'above75Capacity',
	above50Capacity = 'above50Capacity',
	all = 'all',
	below50Capacity = 'below50Capacity',
	expiredOnly = 'expiredOnly',
	nextActiveUpcomingOnly = 'nextActiveUpcomingOnly',
	recentlyExpiredOnly = 'recentlyExpiredOnly',
	soldOutOnly = 'soldOutOnly',
	trashedOnly = 'trashedOnly',
	upcomingOnly = 'upcomingOnly',
}

export enum Status {
	soldOut = 'DTS',
	active = 'DTA',
	upcoming = 'DTU',
	postponed = 'DTP',
	cancelled = 'DTC',
	expired = 'DTE',
	inactive = 'DTI',
}
