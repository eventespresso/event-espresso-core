/**
 * External imports
 */
import { useCallback, useEffect, useState } from '@wordpress/element';
import { EspressoButton, LoadingNotice } from '@eventespresso/components';
import { useOpenEditor } from '@eventespresso/editor-hocs';
import {
	useBasePriceType,
	useCreateTicketEntity,
} from '@eventespresso/hooks';
import { cancelClickEvent } from '@eventespresso/utils';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import EditTicketFormModal from './edit-form/edit-ticket-form-modal';
import useTicketEditorId from './edit-form/use-ticket-editor-id';

const AddNewTicketButton = () => {
	const [ loading, setLoading ] = useState( false );
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
	const ticketEditor = newTicket ? (
		<EditTicketFormModal
			editorId={ editorId }
			ticketEntity={ newTicket }
			onEditorOpen={ onEditorOpen }
			onEditorClose={ onEditorClose }
		/>
	) : null;
	return (
		<>
			<LoadingNotice
				loading={ loading }
				htmlClass={ 'ee-loading-new-entity' }
			/>
			<EspressoButton
				icon={ 'tickets-alt' }
				buttonText={ __( 'Add New Ticket', 'event_espresso' ) }
				onClick={ ( click ) => {
					cancelClickEvent( click, 'AddNewTicketButton' );
					setLoading( true );
				} }
				disabled={ ! basePriceType }
			/>
			{ ticketEditor }
		</>
	);
};

export default AddNewTicketButton;
