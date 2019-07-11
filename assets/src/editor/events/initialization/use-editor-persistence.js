/**
 * External imports
 */
import { useCallback, useEffect, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import jquery from 'jquery';

/**
 * A custom hook connecting with the update/publish submit action in a WordPress
 * post editor that will persist any dirty store state for the `eventespresso/core`
 * store when submit is triggered by  user.
 *
 * @param {number} eventId  The eventId (post id) for the current editor
 *                          instance.  Currently used for breaking cache on
 *                          callbacks.
 */
const useEditorPersistence = ( eventId ) => {
	const eventProcessed = useRef( false );
	const {
		persistAllDeletes,
		persistAllAddRelations,
		persistAllDeleteRelations,
		persistAllEntities,
	} = useDispatch( 'eventespresso/core' );
	const persistAll = useCallback( async ( event ) => {
		if ( eventProcessed.current === false ) {
			event.preventDefault();
			await persistAllDeletes();
			await persistAllAddRelations();
			await persistAllDeleteRelations();
			await persistAllEntities();
			eventProcessed.current = true;
			jquery( 'form#post' ).trigger( 'submit.edit-post' );
		}
	}, [ eventId ] );
	useEffect( () => {
		jquery( 'form#post' ).on( 'submit', persistAll );
		return () => jquery( 'form#post' ).off( 'submit', persistAll );
	}, [ persistAll ] );
};

export default useEditorPersistence;
