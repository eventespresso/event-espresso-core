/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * returns Event Date Entity form prefix
 *
 * @function
 * @param {Object} dateEntity  EE Date object
 * @return {Object} rendered form
 */
const useDateEntityFormInputPrefix = ( dateEntity ) => useMemo( () => {
	return isModelEntityOfModel( dateEntity, 'datetime' ) ?
		`ee-event-date-${ dateEntity.id }` :
		'';
}, [ dateEntity.id ] );

export default useDateEntityFormInputPrefix;
