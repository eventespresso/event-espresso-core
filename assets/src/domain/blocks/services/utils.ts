import { Order, EntityQueryOrderBy, AttendeesOrderByFields } from '@dataServices/apollo/queries';

export const getAttendeesOrderBy = (orderBy: string, order: Order): EntityQueryOrderBy<AttendeesOrderByFields> => {
	const orderByFirstName = {
		field: 'FIRST_NAME',
		order,
	};
	const orderByLastName = {
		field: 'LAST_NAME',
		order,
	};
	let orderByFields = [];
	switch (orderBy) {
		case 'FIRST_THEN_LAST_NAME':
			orderByFields = [orderByFirstName, orderByLastName];
			break;
		case 'LAST_THEN_FIRST_NAME':
			orderByFields = [orderByLastName, orderByFirstName];
			break;
		default:
			orderByFields = [
				{
					field: orderBy,
					order,
				},
			];
			break;
	}

	return orderByFields;
};
