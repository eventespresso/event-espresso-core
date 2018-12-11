/**
 * External imports
 */
import { Component } from 'react';
import { hooks } from '@eventespresso/eejs';
import { IconMenuItem } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorDateMenu } from './editor-date-menu';
import { editEventDate } from '../edit-event-date';
import './style.css';

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
	 * @return {IconMenuItem}    Edit Event Date IconMenuItem
	 */
	editDateMenuItem = ( eventDate ) => {
		const data = { eventDate };
		return (
			<IconMenuItem
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
	 * @param {Object} eventDate    		JSON object defining the Event Date
	 * @param {Function} viewTicketsHandler callback for displaying ticket list
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	viewTicketsMenuItem = ( eventDate, viewTicketsHandler ) => {
		const data = { eventDate };
		return (
			<IconMenuItem
				index={ 2 }
				title={ __( 'view available tickets', 'event_espresso' ) }
				id={ 'view-tickets-date-' + eventDate.id }
				htmlClass={ 'view-tickets-date' }
				dashicon={ 'tickets-alt' }
				onClick={ () => viewTicketsHandler( data ) }
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
					sidebarMenuItem.type === EditorDateMenu ||
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
		sidebarMenuItems.push( <EditorDateMenu eventDate={ eventDate } /> );
		sidebarMenuItems.push( this.editDateMenuItem( eventDate ) );
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
