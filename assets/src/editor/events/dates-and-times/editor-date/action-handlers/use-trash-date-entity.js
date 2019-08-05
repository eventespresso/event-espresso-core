/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

const nullFunc = () => null;
const { confirm } = window;

const useTrashDateEntity = ( dateEntity ) => {
	const { trashEntityById } = useDispatch( 'eventespresso/core' );
	return useCallback( () => {
		if ( ! isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			return nullFunc;
		}
		return () => {
			if ( ! confirm(
				__(
					'Are you sure you want to delete this date?',
					'event_espresso'
				)
			) ) {
				return;
			}
			trashEntityById( 'datetime', dateEntity.id );
		};
	} );
};

export default useTrashDateEntity;
