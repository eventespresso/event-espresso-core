/**
 * filterTicketEntities
 * reduces tickets array based on value of the "order" filter
 *
 * @param {Array} ticketEntities    original tickets array
 * @param {string} order   value for the "order" filter
 * @return {Array}         filtered tickets array
 */
const sortTicketEntitiesList = (ticketEntities, order = 'chronologically') => {
	switch (order) {
		case 'chronologically':
			ticketEntities = sortBy(ticketEntities, [
				function(ticketEntity) {
					return isModelEntityOfModel(ticketEntity, 'ticket') ? ticketEntity.startDate.toMillis() : 0;
				},
				'name',
				'id',
			]);
			break;
		case 'by-name':
			ticketEntities = sortBy(ticketEntities, ['name']);
			break;
		case 'by-id':
			ticketEntities = sortBy(ticketEntities, ['id']);
			break;
		case 'by-order':
			ticketEntities = sortBy(ticketEntities, ['order']);
			break;
	}
	return ticketEntities;
};

export default sortTicketEntitiesList;
