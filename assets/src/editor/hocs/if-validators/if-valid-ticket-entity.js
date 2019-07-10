import { createHigherOrderComponent, ifCondition } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

export default createHigherOrderComponent(
	ifCondition(
		( { ticketEntity } ) => isModelEntityOfModel(
			ticketEntity,
			'ticket'
		)
	),
	'ifValidTicketEntity'
);
