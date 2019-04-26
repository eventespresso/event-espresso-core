/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
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
import { default as PaginatedDatesListWithFilterBar } from './filter-bar';
import { EditEventDateFormModal } from '../';
import {
	withTicketAssignmentsManager,
	TicketAssignmentsManagerModal,
} from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const { createEntity } = dispatch( 'eventespresso/core' );

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
	 */
	addNewEventDate = () => {
		createEntity( 'datetime', {} ).then(
			( newEventDate ) => {
				this.setState( () => ( { newEventDate } ) );
				this.props.toggleEditor();
			}
		);
	};

	/**
	 * @function
	 * @return {Object} rendered button
	 */
	addNewDateButton = () => {
		return (
			<FancyButton
				icon="calendar"
				style="wp-default"
				buttonText={ __( 'Add New Date', 'event_espresso' ) }
				onClick={ ( e ) => {
					e.preventDefault();
					e.stopPropagation();
					this.addNewEventDate();
				} }
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
				onClick={ ( e ) => {
					e.preventDefault();
					e.stopPropagation();
					this.props.toggleTicketAssignments();
				} }
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
] )( PaginatedDatesListWithFilterBar( EditorDatesList ) );
