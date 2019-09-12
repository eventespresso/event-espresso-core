/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { cancelClickEvent } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { confirm } = window;

const useTrashDateEntity = ( eventDate ) => {
	const { trashEntityById } = useDispatch( 'eventespresso/core' );
	return useCallback( async ( click ) => {
		cancelClickEvent( click );
		if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
			return;
		}
		if ( ! confirm(
			__(
				'Are you sure you want to delete this event date?',
				'event_espresso'
			)
		) ) {
			return;
		}
		trashEntityById( 'datetime', eventDate.id );
	} );
};

export default useTrashDateEntity;
