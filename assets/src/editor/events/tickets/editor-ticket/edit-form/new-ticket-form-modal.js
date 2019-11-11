/**
 * External imports
 */
import { useCallback, useEffect, useState } from '@wordpress/element';
import { useOpenEditor } from '@eventespresso/editor-hocs';
import {
	useBasePriceType,
	useCreateTicketEntity,
} from '@eventespresso/hooks';

/**
 * Internal imports
 */
import EditTicketFormModal from './edit-ticket-form-modal';
import useTicketEditorId from './use-ticket-editor-id';

/**
 * @param {Object} props
 * @member {boolean} loading
 * @member {Function} setLoading
 * @return {Object} rendered Edit Ticket Form Modal
 */
const NewTicketFormModal = ( { loading, setLoading } ) => {
	const [ newTicket, cacheNewTicket ] = useState( null );
	const [ toggleTicketEditor, setToggleTicketEditor ] = useState( false );
	const basePriceType = useBasePriceType();
	const createTicketEntity = useCreateTicketEntity(
		cacheNewTicket,
		basePriceType
	);
	const editorId = useTicketEditorId( newTicket, 'new-ticket' );
	const openTicketEditor = useOpenEditor( editorId );
	// using the button click event to create the new ticket entity
	// was causing issues with re-renders due to the async nature of things.
	// triggering everything after render makes the UI run more smoothly
	useEffect( () => {
		if ( loading ) {
			setLoading( false );
			createTicketEntity();
			setToggleTicketEditor( true );
		}
	} );
	// because we have to wait for a valid ticket entity to be created,
	// we can't simply open the editor via the Add New Ticket click event,
	// so instead we toggle the following flag to indicate this
	if ( toggleTicketEditor ) {
		openTicketEditor();
	}
	// once the ticket editor has been opened, we can flip that toggle to off
	const onEditorOpen = useCallback( () => {
		setToggleTicketEditor( false );
	}, [] );
	// once the ticket editor closes, unset the cached ticket,
	// which will get picked up by the main ticket editor list
	// and free up the cache for creating another new ticket
	const onEditorClose = useCallback( () => {
		cacheNewTicket( null );
	}, [] );
	// don't bother rendering the ticket form modal
	// if a new ticket does not exist
	return newTicket ? (
		<EditTicketFormModal
			editorId={ editorId }
			ticketEntity={ newTicket }
			onEditorOpen={ onEditorOpen }
			onEditorClose={ onEditorClose }
		/>
	) : null;
};

export default NewTicketFormModal;
