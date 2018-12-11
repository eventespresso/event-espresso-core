/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';
import { DropDownMenu, IconMenuItem } from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { editEventDate } from '../edit-event-date';

/**
 * EditorDateMenu
 *
 * @function
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {string} rendered menu
 */
export class EditorTicketMenu extends Component {
	constructor( props ) {
		// console.log( '' );
		// console.log( 'EditorDateMenu', props );
		super( props );
		this.state = { menuOpen: false };
	}

	/**
	 * toggleMenu    sets the menuOpen state property to the opposite of its previous value
	 *
	 * @function
	 * @param {Object} event
	 */
	toggleMenu = ( event ) => {
		event.preventDefault();
		this.setState(
			prevState => ( { menuOpen: ! prevState.menuOpen } )
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {IconMenuItem}    Main Event Date IconMenuItem
	 */
	getSidebarMenuItem = ( eventDate ) => {
		return (
			<IconMenuItem
				index={ 1 }
				title={ __( 'event date main menu', 'event_espresso' ) }
				id={ 'date-menu-' + eventDate.id }
				htmlClass={ 'date-menu' }
				dashicon={ 'menu' }
				onClick={ ( event ) => this.toggleMenu( event ) }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {IconMenuItem}    Main Event Date IconMenuItem
	 */
	getDropDownMenu = ( eventDate ) => {
		const menuID = 'editor-date-' + eventDate.id;
		const menuItems = [
			{
				id: 'edit-date',
				dashicon: 'edit',
				text: __( 'edit date', 'event_espresso' ),
				onClick: editEventDate,
				onClickData: { eventDate },
			},
			{
				id: 'copy-date',
				dashicon: 'admin-page',
				text: __( 'copy date', 'event_espresso' ),
			},
			{
				id: 'trash-date',
				dashicon: 'trash',
				text: __( 'trash date', 'event_espresso' ),
			},
			{
				id: 'edit-venue',
				dashicon: 'location',
				text: __( 'edit venue', 'event_espresso' ),
				link: eventDate.edit_venue_link,
				title: __( 'edit venue', 'event_espresso' ),
				tooltip: __( 'venue editor opens in new window', 'event_espresso' ),
			},
		];
		return <DropDownMenu
			menuID={ menuID }
			menuItems={ menuItems }
			title={ __( 'event date main menu', 'event_espresso' ) }
			menuOpen={ this.state.menuOpen }
			onClick={ this.toggleMenu }
		/>;
	};

	render() {
		return this.state.menuOpen ?
			this.getDropDownMenu( this.props.eventDate ) :
			this.getSidebarMenuItem( this.props.eventDate );
	}
}
