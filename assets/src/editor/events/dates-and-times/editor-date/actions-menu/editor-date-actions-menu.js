/**
 * External imports
 */
import moment from 'moment-timezone';
import { Component, Fragment } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { DropDownMenu, IconMenuItem } from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditEventDateFormModal } from '../';
import { copyEventDate, trashEventDate } from '../action-handlers';
import { EntityActionMenuItem } from '../../../entity-action-menu-item';
import { DatesAndTicketsManagerModal } from '../../../dates-and-tickets-metabox';
import './style.css';

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
	 * opens and closes DatesAndTicketsManagerModal
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
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {DropDownMenu}    Edit Event Date DropDownMenu
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
						onClick: this.toggleEditor,
					},
					{
						title: __( 'copy date', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyEventDate( eventDate ),
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
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	viewTicketsMenuItem = ( eventDate ) => {
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ __( 'assign tickets', 'event_espresso' ) }
				id={ `view-tickets-date-${ eventDate.id }` }
				htmlClass="view-tickets-date"
				dashicon="tickets-alt"
				onClick={ this.toggleTickets }
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
		const { eventDate, allTickets, onUpdate } = this.props;
		let sidebarMenuItems = [];
		sidebarMenuItems.push( this.mainDropDownMenu( eventDate ) );
		sidebarMenuItems.push( this.editDateMenuItem( eventDate ) );
		sidebarMenuItems.push( this.viewTicketsMenuItem( eventDate ) );
		sidebarMenuItems = applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			eventDate
		);
		let date = eventDate.start;
		if ( ! moment.isMoment( date ) ) {
			date = date instanceof Date ?
				date :
				new Date( date );
			date = moment( date );
		}

		return eventDate && eventDate.id ? (
			<div
				id={ `ee-editor-date-actions-menu-${ eventDate.id }` }
				className={ 'ee-editor-date-actions-menu' }
			>
				{ this.renderSidebarMenuItems( eventDate, sidebarMenuItems ) }
				<EditEventDateFormModal
					eventDate={ eventDate }
					closeModal={ this.toggleEditor }
					editorOpen={ this.state.editorOpen }
				/>
				<DatesAndTicketsManagerModal
					dates={ [ eventDate ] }
					tickets={ allTickets }
					closeModal={ this.toggleTickets }
					editorOpen={ this.state.editTickets }
					onUpdate={ onUpdate }
					modalProps={ {
						title: sprintf(
							_x(
								'Ticket Assignments for: %1$s',
								'Ticket Assignments for: Date & date name',
								'event_espresso'
							),
							`${ eventDate.name } (${ date.format( 'ddd MMM' +
								' DD, YYYY' ) })`
						),
						closeButtonLabel: null,
					} }
				/>
			</div>
		) : null;
	}
}

export default EditorDateActionsMenu;
