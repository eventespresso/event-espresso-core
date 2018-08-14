/**
 * External imports
 */
import { Component } from 'react';
import { hooks } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorDateMenu } from './editor-date-menu';
import { SidebarMenuItem } from './sidebar-menu-item';
import { editEventDate } from './edit-event-date';
import { viewEventDateTickets } from './view-event-date-tickets';

/**
 * EditorDateSidebar
 *
 * @constructor
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {string} rendered menu
 */
export class EditorDateSidebar extends Component {
	/**
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {SidebarMenuItem}    Edit Event Date SidebarMenuItem
	 */
	editDateMenuItem = ( eventDate ) => {
		const data = { eventDate };
		return (
			<SidebarMenuItem
				index={ 1 }
				title={ __( 'edit event date', 'event_espresso' ) }
				id={ 'edit-date-' + eventDate.id }
				htmlClass={ 'edit-date' }
				dashicon={ 'edit' }
				onClick={ ( event ) => editEventDate( event, data ) }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {SidebarMenuItem}    View Tickets for Event Date SidebarMenuItem
	 */
	viewTicketsMenuItem = ( eventDate ) => {
		const data = { eventDate };
		return (
			<SidebarMenuItem
				index={ 1 }
				title={ __( 'view available tickets for this event date', 'event_espresso' ) }
				id={ 'view-tickets-date-' + eventDate.id }
				htmlClass={ 'view-tickets-date' }
				dashicon={ 'tickets-alt' }
				onClick={ ( event ) => viewEventDateTickets( event, data ) }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    	JSON object defining the Event Date
	 * @param {Array} sidebarMenuItems  Array of SidebarMenuItem objects
	 * @return {Array}    				Array of rendered SidebarMenuItem list items
	 */
	renderSidebarMenuItems = ( eventDate, sidebarMenuItems ) => {
		return sidebarMenuItems.map(
			function( sidebarMenuItem, index ) {
				return sidebarMenuItem && (
					<li
						key={ index }
						id={ `ee-editor-date-sidebar-menu-item-${ eventDate.id }-${ index }` }
						className={ `ee-editor-date-sidebar-menu-item-${ index } ee-editor-date-sidebar-menu-item` }
					>
						{ sidebarMenuItem }
					</li>
				);
			}
		);
	};

	render() {
		const { eventDate } = this.props;
		// console.log( '' );
		// console.log( 'EditorDateSidebar' );
		let sidebarMenuItems = [];
		sidebarMenuItems.push( <EditorDateMenu eventDate={ eventDate } /> );
		sidebarMenuItems.push( this.editDateMenuItem( eventDate ) );
		sidebarMenuItems.push( this.viewTicketsMenuItem( eventDate ) );
		// console.log( '>>> >>> EditorDateSidebar applyFilters' );
		sidebarMenuItems = hooks.applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			eventDate
		);
		const sidebarMenu = this.renderSidebarMenuItems( eventDate, sidebarMenuItems );
		return (
			<div
				id={ `ee-editor-date-sidebar-menu-${ eventDate.id }` }
				className={ 'ee-editor-date-sidebar-menu' }
			>
				<ul className={ 'ee-editor-date-sidebar-menu-list' }>
					{ sidebarMenu }
				</ul>
			</div>
		);
	}
}
