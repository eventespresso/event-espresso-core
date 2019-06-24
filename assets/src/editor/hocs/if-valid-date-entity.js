import { createHigherOrderComponent, ifCondition } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

export default createHigherOrderComponent(
	ifCondition(
		( { dateEntity } ) => isModelEntityOfModel(
			dateEntity,
			'datetime'
		)
	),
	'ifValidDateEntity'
);
