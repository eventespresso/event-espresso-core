/**
 * External imports
 */
import { useCallback, useEffect, useState } from '@wordpress/element';
import { EspressoButton, LoadingNotice } from '@eventespresso/components';
import { useOpenEditor } from '@eventespresso/editor-hocs';
import {
	useCreateDateEntity,
	useEventEditorEvent,
	useEventEditorTickets,
} from '@eventespresso/hooks';

import { __, _x, sprintf } from '@eventespresso/i18n';
import { cancelClickEvent } from '@eventespresso/utils';

/**
 * Internal imports
 */
import DateEntityFormModal from './edit-form/date-entity-form-modal';
import useEventDateEditorId from './edit-form/use-event-date-editor-id';
import TicketAssignmentsManagerModal
	from '../../ticket-assignments-manager/ticket-assignments-manager-modal';
import useTicketAssignmentsEditorId
	from '../../ticket-assignments-manager/use-ticket-assignments-editor-id';

const AddNewDateEntityButton = () => {
	const [ loading, setLoading ] = useState( false );
	const [ newDate, cacheNewDate ] = useState( null );
	const [ toggleDateEditor, setToggleDateEditor ] = useState( false );
	const [ toggleTamEditor, setToggleTamEditor ] = useState( false );
	// editor event and callback for generating a new event date
	const { eventEntity, eventEntityLoaded } = useEventEditorEvent();
	const createDateEntity = useCreateDateEntity( eventEntity, cacheNewDate );
	// date editor controls
	const dateEditorId = useEventDateEditorId( newDate, 'new-date' );
	const openDateEditor = useOpenEditor( dateEditorId );
	// all tickets and ticket assignments editor controls
	const { tickets } = useEventEditorTickets();
	const tamEditorId = useTicketAssignmentsEditorId(
		newDate,
		null,
		[],
		tickets,
		'new-date'
	);
	const openTamEditor = useOpenEditor( tamEditorId );
	// using the button click event to create the new date entity
	// was causing issues with re-renders due to the async nature of things.
	// triggering everything after render makes the UI run more smoothly
	useEffect( () => {
		if ( loading ) {
			setLoading( false );
			createDateEntity();
			setToggleDateEditor( true );
		}
	} );
	// because we have to wait for a valid date entity to be created,
	// we can't simply open the editor via the Add New Date click event,
	// so instead we toggle the following flag to indicate this
	if ( toggleDateEditor ) {
		openDateEditor();
	}
	// a similar timing scenario exists with the ticket assignments editor
	if ( toggleTamEditor ) {
		openTamEditor();
	}
	// once the date editor has been opened, we can flip that toggle to off
	const onDateEditorOpen = useCallback( () => {
		setToggleDateEditor( false );
	}, [] );
	// when the date editor closes, indicate that we want the tam editor opened
	const onDateEditorClose = useCallback( () => {
		setToggleTamEditor( true );
	}, [] );
	// then upon the tam editor opening set the toggle to off again
	const onTamEditorOpen = useCallback( () => {
		setToggleTamEditor( false );
	}, [] );
	// once the tam editor closes, unset the cached date,
	// which will get picked up by the main date editor list
	// and free up the cache for creating another new date
	const onTamEditorClose = useCallback( () => {
		cacheNewDate( null );
	}, [] );
	// don't bother rendering the date form modal if a new date does not exist
	const dateEditor = newDate ? (
		<DateEntityFormModal
			editorId={ dateEditorId }
			dateEntity={ newDate }
			onEditorOpen={ onDateEditorOpen }
			onEditorClose={ onDateEditorClose }
		/>
	) : null;
	// also don't render the tam editor modal if a new date does not exist
	const tamEditor = newDate ? (
		<TicketAssignmentsManagerModal
			editorId={ tamEditorId }
			dateEntity={ newDate }
			allTicketEntities={ tickets }
			editorTitle={ sprintf(
				_x(
					'Ticket Assignments for: %1$s',
					'Ticket Assignments for: date name & start date',
					'event_espresso'
				),
				`${ newDate.name } (${
					newDate.start.toFormat( 'ddd MMM DD, YYYY' )
				})`
			) }
			onEditorOpen={ onTamEditorOpen }
			onEditorClose={ onTamEditorClose }
		/>
	) : null;

	return (
		<>
			<LoadingNotice
				loading={ loading }
				htmlClass={ 'ee-loading-new-entity' }
			/>
			<EspressoButton
				icon={ 'calendar' }
				buttonText={ __( 'Add New Date', 'event_espresso' ) }
				onClick={ ( click ) => {
					cancelClickEvent( click, 'AddNewDateEntityButton' );
					setLoading( true );
				} }
				disabled={ ! eventEntityLoaded }
			/>
			{ dateEditor }
			{ tamEditor }
		</>
	);
};

export default AddNewDateEntityButton;
