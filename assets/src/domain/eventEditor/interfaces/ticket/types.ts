export enum SortTicketsBy {
	date = 'date',
	name = 'name',
	id = 'id',
	order = 'order',
}

export enum ShowTickets {
	above50Sold = 'above-50-sold',
	above75Sold = 'above-75-sold',
	above90Sold = 'above-90-sold',
	all = 'all',
	trashedOnly = 'trashed-only',
	below50Sold = 'below-50-sold',
	expiredOnly = 'expired-only',
	nextOnSaleOrPendingOnly = 'next-on-sale-or-pending-only',
	onSaleAndPending = 'on-sale-and-pending',
	onSaleOnly = 'on-sale-only',
	pendingOnly = 'pending-only',
	soldOutOnly = 'sold-out-only',
}
