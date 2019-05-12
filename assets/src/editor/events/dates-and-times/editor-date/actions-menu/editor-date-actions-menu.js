/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { DropDownMenu, IconMenuItem } from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';
import { withEditor } from '@eventespresso/higher-order-components';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { withDatetimeTickets } from '../../data';
import { EditEventDateFormModal } from '../';
import { withCopyEventDate, trashEventDate } from '../action-handlers';
import { EntityActionMenuItem } from '../../../entity-action-menu-item';
import {
	withTicketAssignmentsManager,
	TicketAssignmentsManagerModal,
} from '../../../ticket-assignments-manager';
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
	/**
	 * @function
	 * @param {Object} eventDate    	 JSON object defining the Event Date
	 * @return {DropDownMenu}    		 Edit Event Date DropDownMenu
	 */
	mainDropDownMenu = ( eventDate ) => {
		return (
			<DropDownMenu
				tooltip={ __( 'event date main menu', 'event_espresso' ) }
				htmlClass={ `editor-date-${ eventDate.id }` }
				menuItems={ [
					{
						title: __( 'edit date', 'event_espresso' ),
						icon: 'edit',
						onClick: this.props.toggleEditor,
					},
					{
						title: __( 'copy date', 'event_espresso' ),
						icon: 'admin-page',
						onClick: this.props.copyEventDate,
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
				onClick={ this.props.toggleEditor }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate JSON object defining the Event Date
	 * @param {Array} datetimeTickets    Tickets for Event Date
	 * @param {boolean} ticketsLoaded
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	viewTicketsMenuItem = ( eventDate, datetimeTickets, ticketsLoaded ) => {
		const tooltip = ticketsLoaded && isEmpty( datetimeTickets ) ?
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
				onClick={ this.props.toggleTicketAssignments }
				itemCount={ ticketsLoaded ? datetimeTickets.length : null }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    	 JSON object defining the Event Date
	 * @param {Array} datetimeTickets    Tickets for Event Date
	 * @param {boolean} ticketsLoaded
	 * @return {Array}    				 Array of IconMenuItem objects
	 */
	getSidebarMenuItems = ( eventDate, datetimeTickets, ticketsLoaded ) => {
		const sidebarMenuItems = [];
		sidebarMenuItems.push(
			this.mainDropDownMenu( eventDate )
		);
		sidebarMenuItems.push( this.editDateMenuItem( eventDate ) );
		sidebarMenuItems.push(
			this.viewTicketsMenuItem( eventDate, datetimeTickets, ticketsLoaded )
		);
		return applyFilters(
			'FHEE__EditorDateActionsMenu__SidebarMenuItems',
			sidebarMenuItems,
			eventDate
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    	JSON object defining the Event Date
	 * @param {Array} datetimeTickets 	Tickets for Event Date
	 * @param {boolean} ticketsLoaded
	 * @return {Array} Array of rendered IconMenuItem list items
	 */
	sidebarMenu = ( eventDate, datetimeTickets, ticketsLoaded ) => {
		const sidebarMenuItems = this.getSidebarMenuItems(
			eventDate,
			datetimeTickets,
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
			editorOpen,
			toggleEditor,
			showTicketAssignments,
			toggleTicketAssignments,
			datetimeTickets = [],
			ticketsLoaded = false,
		} = this.props;
		if ( ! isModelEntityOfModel( eventDate, DATETIME ) ) {
			return null;
		}
		return eventDate && eventDate.id ? (
			<div
				id={ `ee-editor-date-actions-menu-${ eventDate.id }` }
				className={ 'ee-editor-date-actions-menu' }
			>
				{ this.sidebarMenu( eventDate, datetimeTickets, ticketsLoaded ) }
				<EditEventDateFormModal
					event={ event }
					eventDate={ eventDate }
					toggleEditor={ toggleEditor }
					editorOpen={ editorOpen }
				/>
				<TicketAssignmentsManagerModal
					date={ eventDate }
					allTickets={ allTickets }
					toggleEditor={ toggleTicketAssignments }
					editorOpen={ showTicketAssignments }
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

export default compose( [
	withEditor,
	withTicketAssignmentsManager,
	withDatetimeTickets,
	withCopyEventDate,
] )( EditorDateActionsMenu );
