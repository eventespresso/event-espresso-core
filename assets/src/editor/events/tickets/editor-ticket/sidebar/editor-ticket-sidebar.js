/**
 * External imports
 */
import { Component } from 'react';
import { hooks } from '@eventespresso/eejs';
import { DropDownMenu, IconMenuItem } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { editTicket, copyTicket, trashTicket } from '../actions';

/**
 * EditorTicketSidebar
 *
 * @constructor
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {string} rendered menu
 */
export class EditorTicketSidebar extends Component {
	/**
	 * @function
	 * @param {Object} ticket    JSON object defining the ticket
	 * @return {DropDownMenu}    Edit Ticket DropDownMenu
	 */
	mainDropDownMenu = ( ticket ) => {
		return (
			<DropDownMenu
				tooltip={ __( 'event date main menu', 'event_espresso' ) }
				htmlClass={ `editor-date-${ ticket.id }` }
				menuItems={ [
					{
						title: __( 'edit date', 'event_espresso' ),
						icon: 'edit',
						onClick: () => editTicket( ticket ),
					},
					{
						title: __( 'copy date', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyTicket( ticket ),
					},
					{
						title: __( 'trash date', 'event_espresso' ),
						icon: 'trash',
						onClick: () => trashTicket( ticket ),
					},
				] }
			/>
		);
	};
	/**
	 * @function
	 * @param {Object} ticket    JSON object defining the Event Date
	 * @return {IconMenuItem}    Edit Event Date IconMenuItem
	 */
	editTicketMenuItem = ( ticket ) => {
		return (
			<IconMenuItem
				index={ 1 }
				tooltip={ __( 'edit event date', 'event_espresso' ) }
				id={ 'edit-date-' + ticket.id }
				htmlClass={ 'edit-date' }
				dashicon={ 'edit' }
				onClick={ () => editTicket( ticket ) }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket    		JSON object defining the Event Date
	 * @param {Function} viewTicketsHandler callback for displaying ticket list
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	viewTicketsMenuItem = ( ticket, viewTicketsHandler ) => {
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ __( 'view available tickets', 'event_espresso' ) }
				id={ 'view-tickets-date-' + ticket.id }
				htmlClass={ 'view-tickets-date' }
				dashicon={ 'tickets-alt' }
				onClick={ () => console.log( ticket ) }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    	JSON object defining the Event Date
	 * @param {Array} sidebarMenuItems  Array of IconMenuItem objects
	 * @return {Array}    				Array of rendered IconMenuItem list items
	 */
	renderSidebarMenuItems = ( eventDate, sidebarMenuItems ) => {
		return sidebarMenuItems.map(
			function( sidebarMenuItem, index ) {
				return sidebarMenuItem && sidebarMenuItem.type && (
					sidebarMenuItem.type === DropDownMenu ||
					sidebarMenuItem.type === IconMenuItem
				) && (
					<div key={ index }
						id={
							`ee-editor-date-sidebar-menu-item-
							${ eventDate.id }-${ index }`
						}
						className={
							`ee-editor-date-sidebar-menu-item-${ index }
							 ee-editor-date-sidebar-menu-item`
						}
					>
						{ sidebarMenuItem }
					</div>
				);
			}
		);
	};

	render() {
		const { eventDate, viewTicketsHandler } = this.props;
		let sidebarMenuItems = [];
		sidebarMenuItems.push( this.mainDropDownMenu( eventDate ) );
		sidebarMenuItems.push( this.editTicketMenuItem( eventDate ) );
		sidebarMenuItems.push(
			this.viewTicketsMenuItem( eventDate, viewTicketsHandler )
		);
		sidebarMenuItems = hooks.applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			eventDate
		);
		return (
			<div
				id={ `ee-editor-date-sidebar-menu-${ eventDate.id }` }
				className={ 'ee-editor-date-sidebar-menu' }
			>
				{ this.renderSidebarMenuItems( eventDate, sidebarMenuItems ) }
			</div>
		);
	}
}
