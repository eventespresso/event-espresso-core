/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import {
	EntityList,
	FancyButton,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { withEditor } from '@eventespresso/higher-order-components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorDatesGridView, EditorDatesListView } from './';
import PaginatedDatesListWithFilterBar from './filter-bar';
import { EditEventDateFormModal } from '../';
import {
	withTicketAssignmentsManager,
	TicketAssignmentsManagerModal,
} from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

/**
 * EditorDatesList
 * EntityList component for displaying event dates in the editor
 *
 * @class
 * @param {Array} entities 	array of JSON objects defining the Event Dates
 * @param {string} view
 * @param {Function} retrieveDates
 * @param {mixed} otherProps
 */
class EditorDatesList extends Component {
	constructor( props ) {
		super( props );
		this.state = { newEventDate: null };
	}

	/**
	 * @function
	 * @return {Object} rendered button
	 */
	addNewDateButton = () => {
		const addDate = () => this.props.addNewEventDate(
			( state ) => this.setState( state ),
			this.props.toggleEditor
		);
		return (
			<FancyButton
				icon="calendar"
				style="wp-default"
				buttonText={ __( 'Add New Date', 'event_espresso' ) }
				onClick={ addDate }
			/>
		);
	};

	/**
	 * @function
	 * @return {Object} rendered button
	 */
	ticketAssignmentsButton = () => {
		return (
			<FancyButton
				icon="tickets-alt"
				style="wp-default"
				buttonText={ __(
					'Ticket Assignments',
					'event_espresso'
				) }
				onClick={ this.props.toggleTicketAssignments }
			/>
		);
	};

	render() {
		const {
			view,
			event,
			entities,
			allDates,
			allTickets,
			editorOpen,
			toggleEditor,
			showTicketAssignments,
			toggleTicketAssignments,
			...otherProps
		} = this.props;
		return (
			<FormWrapper>
				<EntityList
					entities={ entities }
					allDates={ allDates }
					allTickets={ allTickets }
					EntityGridView={ EditorDatesGridView }
					EntityListView={ EditorDatesListView }
					view={ view }
					event={ event }
					{ ...otherProps }
				/>
				<FormSaveCancelButtons
					submitButton={ this.addNewDateButton() }
					cancelButton={ this.ticketAssignmentsButton() }
				/>
				<EditEventDateFormModal
					event={ event }
					eventDate={ this.state.newEventDate }
					toggleEditor={ toggleEditor }
					editorOpen={ editorOpen }
				/>
				<TicketAssignmentsManagerModal
					allDates={ allDates }
					allTickets={ allTickets }
					toggleEditor={ toggleTicketAssignments }
					editorOpen={ showTicketAssignments }
					modalProps={ {
						title: __(
							'Ticket Assignments for All Event Dates',
							'event_espresso'
						),
						closeButtonLabel: null,
					} }
				/>
			</FormWrapper>
		);
	}
}

export default compose( [
	withEditor,
	withTicketAssignmentsManager,
	PaginatedDatesListWithFilterBar,
	withDispatch( ( dispatch ) => {
		const { createEntity } = dispatch( 'eventespresso/core' );
		const addNewEventDate = ( setState, toggleEditor ) => {
			createEntity( 'datetime', {} ).then(
				( newEventDate ) => {
					setState( { newEventDate } );
					toggleEditor();
				}
			);
		};
		return { addNewEventDate };
	} ),
] )( EditorDatesList );
