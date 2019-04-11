/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { DropDownMenu, IconMenuItem } from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { EditEventDateFormModal } from '../';
import { copyEventDate, trashEventDate } from '../action-handlers';
import { EntityActionMenuItem } from '../../../entity-action-menu-item';
import { TicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import './style.css';

const { MODEL_NAME: DATETIME } = dateTimeModel;

/**
 * EditorDateActionsMenu
 * menu of IconButtons for performing actions on the supplied Event Date
 *
 * @constructor
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {Object} rendered menu
 */
class EditorDateActionsMenu extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			editorOpen: false,
			editTickets: false,
		};
	}

	/**
	 * opens and closes EditEventDateFormModal
	 *
	 * @function
	 */
	toggleEditor = () => {
		this.setState( ( prevState ) => (
			{ editorOpen: ! prevState.editorOpen }
		) );
	};

	/**
	 * opens and closes TicketAssignmentsManagerModal
	 *
	 * @function
	 */
	toggleTickets = () => {
		this.setState( ( prevState ) => (
			{ editTickets: ! prevState.editTickets }
		) );
	};

	/**
	 * @function
	 * @param {Object} eventDate    	 JSON object defining the Event Date
	 * @param {Array} relatedTickets    Tickets for Event Date
	 * @param {boolean} ticketsLoaded
	 * @return {DropDownMenu}    		 Edit Event Date DropDownMenu
	 */
	mainDropDownMenu = ( eventDate, relatedTickets, ticketsLoaded ) => {
		return (
			<DropDownMenu
				tooltip={ __( 'event date main menu', 'event_espresso' ) }
				htmlClass={ `editor-date-${ eventDate.id }` }
				menuItems={ [
					{
						title: __( 'edit date', 'event_espresso' ),
						icon: 'edit',
						onClick: this.toggleEditor,
					},
					{
						title: __( 'copy date', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyEventDate(
							eventDate,
							relatedTickets,
							ticketsLoaded
						),
					},
					{
						title: __( 'trash date', 'event_espresso' ),
						icon: 'trash',
						onClick: () => trashEventDate( eventDate ),
					},
					{
						title: __( 'edit venue', 'event_espresso' ),
						icon: 'location',
						onClick: () => window.location(
							eventDate.edit_venue_link
						),
					},
				] }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {IconMenuItem}    Edit Event Date IconMenuItem
	 */
	editDateMenuItem = ( eventDate ) => {
		return (
			<IconMenuItem
				index={ 1 }
				tooltip={ __( 'edit event date', 'event_espresso' ) }
				id={ `edit-date-${ eventDate.id }` }
				htmlClass="edit-date"
				dashicon="edit"
				onClick={ this.toggleEditor }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate JSON object defining the Event Date
	 * @param {Array} relatedTickets    Tickets for Event Date
	 * @param {boolean} ticketsLoaded
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	viewTicketsMenuItem = ( eventDate, relatedTickets, ticketsLoaded ) => {
		const tooltip = ticketsLoaded && isEmpty( relatedTickets ) ?
			__(
				'warning! no assigned tickets - click to fix',
				'event_espresso'
			) :
			__( 'assign tickets', 'event_espresso' );
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ tooltip }
				id={ `view-tickets-date-${ eventDate.id }` }
				htmlClass="view-tickets-date"
				dashicon="tickets-alt"
				onClick={ this.toggleTickets }
				itemCount={ ticketsLoaded ? relatedTickets.length : null }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    	 JSON object defining the Event Date
	 * @param {Array} relatedTickets    Tickets for Event Date
	 * @param {boolean} ticketsLoaded
	 * @return {Array}    				 Array of IconMenuItem objects
	 */
	getSidebarMenuItems = ( eventDate, relatedTickets, ticketsLoaded ) => {
		const sidebarMenuItems = [];
		sidebarMenuItems.push(
			this.mainDropDownMenu( eventDate, relatedTickets, ticketsLoaded )
		);
		sidebarMenuItems.push( this.editDateMenuItem( eventDate ) );
		sidebarMenuItems.push(
			this.viewTicketsMenuItem( eventDate, relatedTickets, ticketsLoaded )
		);
		return applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			eventDate
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    	JSON object defining the Event Date
	 * @param {Array} relatedTickets 	Tickets for Event Date
	 * @param {boolean} ticketsLoaded
	 * @return {Array} Array of rendered IconMenuItem list items
	 */
	sidebarMenu = ( eventDate, relatedTickets, ticketsLoaded ) => {
		const sidebarMenuItems = this.getSidebarMenuItems(
			eventDate,
			relatedTickets,
			ticketsLoaded
		);
		return sidebarMenuItems.map(
			function( sidebarMenuItem, index ) {
				return (
					sidebarMenuItem && sidebarMenuItem.type &&
					(
						sidebarMenuItem.type === DropDownMenu ||
						sidebarMenuItem.type === EntityActionMenuItem ||
						sidebarMenuItem.type === IconMenuItem
					) ?
						<Fragment key={ index }>
							{ sidebarMenuItem }
						</Fragment> :
						null
				);
			},
		);
	};

	render() {
		const {
			event,
			eventDate,
			allTickets,
			relatedTickets,
			ticketsLoaded,
		} = this.props;
		if ( ! isModelEntityOfModel( eventDate, DATETIME ) ) {
			return null;
		}
		return eventDate && eventDate.id ? (
			<div
				id={ `ee-editor-date-actions-menu-${ eventDate.id }` }
				className={ 'ee-editor-date-actions-menu' }
			>
				{ this.sidebarMenu( eventDate, relatedTickets, ticketsLoaded ) }
				<EditEventDateFormModal
					event={ event }
					eventDate={ eventDate }
					closeModal={ this.toggleEditor }
					editorOpen={ this.state.editorOpen }
				/>
				<TicketAssignmentsManagerModal
					date={ eventDate }
					allTickets={ allTickets }
					closeModal={ this.toggleTickets }
					editorOpen={ this.state.editTickets }
					modalProps={ {
						title: sprintf(
							_x(
								'Ticket Assignments for: %1$s',
								'Ticket Assignments for: Date & date name',
								'event_espresso'
							),
							`${ eventDate.name } (${
								eventDate.start.toFormat( 'ddd MMM DD, YYYY' )
							})`
						),
						closeButtonLabel: null,
					} }
				/>
			</div>
		) : null;
	}
}

export default withSelect( ( select, ownProps ) => {
	const { getRelatedEntities } = select( 'eventespresso/core' );
	const { hasFinishedResolution } = select( 'core/data' );
	const eventDate = ownProps.eventDate;
	let relatedTickets = [];
	let ticketsLoaded = false;
	if ( isModelEntityOfModel( eventDate, 'datetime' ) ) {
		relatedTickets = getRelatedEntities( eventDate, 'ticket' );
		ticketsLoaded = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ eventDate, 'ticket' ]
		);
	}
	return { relatedTickets, ticketsLoaded };
} )( EditorDateActionsMenu );
