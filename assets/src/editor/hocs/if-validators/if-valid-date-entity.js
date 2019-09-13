import { ifCondition } from '@wordpress/compose';
import { isModelEntityOfModel } from '@eventespresso/validators';

export default ifCondition( ( { dateEntity } ) =>
	isModelEntityOfModel( dateEntity, 'datetime' )
);
