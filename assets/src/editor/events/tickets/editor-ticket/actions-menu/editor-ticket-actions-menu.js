/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { Component, Fragment, isValidElement } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import {
	DropDownMenu,
	EspressoIcon,
	IconMenuItem,
} from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';
import { withEditor } from '@eventespresso/higher-order-components';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { withTicketDatetimes, withTicketPrices } from '../../data';
import { EditTicketFormModal } from '../';
import { copyTicket, trashTicket } from '../action-handlers';
import { EntityActionMenuItem } from '../../../entity-action-menu-item';
import { TicketPriceCalculatorMenuItem } from '../price-calculator';
import { withTicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import './style.css';

/**
 * EditorTicketActionsMenu
 * menu of IconButtons for performing actions on the supplied Ticket
 *
 * @constructor
 * @param {Object} ticket    JSON object defining the Ticket
 * @return {Object} rendered menu
 */
class EditorTicketActionsMenu extends Component {
	/**
	 * @function
	 * @param {Object} ticket    JSON object defining the Ticket
	 * @param {Array} relatedDates    Event Dates for the Ticket
	 * @param {boolean} datesLoaded
	 * @return {DropDownMenu}    Edit Ticket DropDownMenu
	 */
	mainDropDownMenu = ( ticket, relatedDates, datesLoaded ) => {
		return (
			<DropDownMenu
				tooltip={ __( 'ticket main menu', 'event_espresso' ) }
				tooltipPosition="top right"
				htmlClass={ `editor-ticket-${ ticket.id }` }
				menuItems={ [
					{
						title: __( 'edit ticket', 'event_espresso' ),
						icon: 'edit',
						onClick: this.props.toggleEditor,
					},
					{
						title: __( 'copy ticket', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyTicket(
							ticket,
							relatedDates,
							datesLoaded
						),
					},
					{
						title: __( 'trash ticket', 'event_espresso' ),
						icon: 'trash',
						onClick: () => trashTicket( ticket ),
					},
				] }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket    JSON object defining the Ticket
	 * @return {IconMenuItem}    Edit Ticket IconMenuItem
	 */
	editTicketMenuItem = ( ticket ) => {
		return (
			<IconMenuItem
				index={ 1 }
				tooltip={ __( 'edit ticket details', 'event_espresso' ) }
				id={ `edit-ticket-${ ticket.id }` }
				htmlClass="edit-ticket"
				dashicon="edit"
				tooltipPosition="top right"
				onClick={ this.props.toggleEditor }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket JSON object defining the Ticket
	 * @param {Array} relatedDates    Event Dates for the Ticket
	 * @param {boolean} datesLoaded
	 * @return {IconMenuItem}    View Tickets for Ticket IconMenuItem
	 */
	assignDatesMenuItem = ( ticket, relatedDates, datesLoaded ) => {
		const tooltip = datesLoaded && isEmpty( relatedDates ) ?
			__(
				'warning! no assigned ticket dates - click to fix',
				'event_espresso'
			) :
			__( 'assign ticket to event dates', 'event_espresso' );
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ tooltip }
				id={ `assign-ticket-dates-ticket-${ ticket.id }` }
				htmlClass={ 'assign-ticket-dates' }
				dashicon={ <EspressoIcon icon="calendar" /> }
				tooltipPosition="top right"
				onClick={ this.props.toggleTicketAssignments }
				itemCount={ datesLoaded ? relatedDates.length : null }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket 	model object defining the Ticket
	 * @param {Array} relatedDates    Event Dates for the Ticket
	 * @param {boolean} datesLoaded
	 * @param {Object} calculator button for launching price calculator
	 * @return {Array}          Array of IconMenuItem objects
	 */
	getSidebarMenuItems = (
		ticket,
		relatedDates,
		datesLoaded,
		calculator,
	) => {
		const sidebarMenuItems = [];
		sidebarMenuItems.push(
			this.mainDropDownMenu( ticket, relatedDates, datesLoaded )
		);
		sidebarMenuItems.push( this.editTicketMenuItem( ticket ) );
		sidebarMenuItems.push( calculator );
		sidebarMenuItems.push(
			this.assignDatesMenuItem( ticket, relatedDates, datesLoaded )
		);
		return applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			ticket
		);
	};

	/**
	 * @function
	 * @param {Array} sidebarMenuItems
	 * @return {Array} 				Array of rendered IconMenuItem list items
	 */
	sidebarMenu = ( sidebarMenuItems ) => {
		return sidebarMenuItems.map(
			( sidebarMenuItem, index ) => {
				return (
					sidebarMenuItem && sidebarMenuItem.type &&
					(
						sidebarMenuItem.type === DropDownMenu ||
						sidebarMenuItem.type === EntityActionMenuItem ||
						sidebarMenuItem.type === IconMenuItem ||
						isValidElement( sidebarMenuItem )
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
			ticket,
			editorOpen,
			toggleEditor,
			ticketDatetimes = [],
			datesLoaded = false,
			noBasePrice = false,
		} = this.props;
		if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
			return null;
		}
		const calculator = <TicketPriceCalculatorMenuItem
			ticket={ ticket }
			noBasePrice={ noBasePrice }
		/>;
		const sidebarMenuItems = this.getSidebarMenuItems(
			ticket,
			ticketDatetimes,
			datesLoaded,
			calculator
		);
		return ticket && ticket.id ? (
			<div
				id={ `ee-editor-ticket-actions-menu-${ ticket.id }` }
				className={ 'ee-editor-ticket-actions-menu' }
			>
				{ this.sidebarMenu( sidebarMenuItems ) }
				<EditTicketFormModal
					ticket={ ticket }
					toggleEditor={ toggleEditor }
					editorOpen={ editorOpen }
					calculator={ calculator }
				/>
			</div>
		) : null;
	}
}

export default compose( [
	withEditor,
	withTicketAssignmentsManagerModal( ( { ticket } ) => (
		{
			title: sprintf(
				_x(
					'Date Assignments for Ticket:  %1$s',
					'Date Assignments for Ticket:  Ticket name',
					'event_espresso'
				),
				ticket.name
			),
			closeButtonLabel: null,
		}
	) ),
	withTicketDatetimes,
	withTicketPrices,
] )( EditorTicketActionsMenu );
