/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import {
	DropDownMenu,
	EspressoIcon,
	IconMenuItem,
} from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: TICKET } = ticketModel;

/**
 * Internal dependencies
 */
import { EditTicketFormModal } from '../';
import { copyTicket, trashTicket } from '../action-handlers';
import { EntityActionMenuItem } from '../../../entity-action-menu-item';
import { DatesAndTicketsManagerModal } from '../../../dates-and-tickets-metabox';
import {
	default as TicketPriceCalculatorFormModal,
} from '../price-calculator/ticket-price-calculator-form-modal';
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
	constructor( props ) {
		super( props );
		this.state = {
			editorOpen: false,
			assignDates: false,
			calculator: false,
		};
	}

	/**
	 * opens and closes EditTicketFormModal
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
			{ assignDates: ! prevState.assignDates }
		) );
	};

	/**
	 * opens and closes TicketPriceCalculatorModal
	 *
	 * @function
	 */
	toggleCalculator = () => {
		this.setState( ( prevState ) => (
			{ calculator: ! prevState.calculator }
		) );
	};

	/**
	 * @function
	 * @param {Object} ticket    JSON object defining the Ticket
	 * @return {DropDownMenu}    Edit Ticket DropDownMenu
	 */
	mainDropDownMenu = ( ticket ) => {
		return (
			<DropDownMenu
				tooltip={ __( 'ticket main menu', 'event_espresso' ) }
				tooltipPosition="top right"
				htmlClass={ `editor-ticket-${ ticket.id }` }
				menuItems={ [
					{
						title: __( 'edit ticket', 'event_espresso' ),
						icon: 'edit',
						onClick: this.toggleEditor,
					},
					{
						title: __( 'copy ticket', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyTicket( ticket ),
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
				onClick={ this.toggleEditor }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket JSON object defining the Ticket
	 * @return {IconMenuItem}    View Tickets for Ticket IconMenuItem
	 */
	assignDatesMenuItem = ( ticket ) => {
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ __( 'assign ticket to event dates', 'event_espresso' ) }
				id={ `assign-ticket-dates-ticket-${ ticket.id }` }
				htmlClass="view-tickets-dates"
				// dashicon="calendar-alt"
				dashicon={ <EspressoIcon icon="calendar" /> }
				tooltipPosition="top right"
				onClick={ this.toggleTickets }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket JSON object defining the Ticket
	 * @return {IconMenuItem}    View Tickets for Ticket IconMenuItem
	 */
	calculatePriceMenuItem = ( ticket ) => {
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ __( 'calculate ticket price', 'event_espresso' ) }
				id={ `calculate-ticket-price-ticket-${ ticket.id }` }
				htmlClass="calculate-tickets-price"
				dashicon={ <EspressoIcon icon="calculator" /> }
				tooltipPosition="top right"
				onClick={ this.toggleCalculator }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket    	JSON object defining the Ticket
	 * @param {Array} sidebarMenuItems  Array of IconMenuItem objects
	 * @return {Array}    				Array of rendered IconMenuItem list items
	 */
	renderSidebarMenuItems = ( ticket, sidebarMenuItems ) => {
		return sidebarMenuItems.map(
			( sidebarMenuItem, index ) => {
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
		const { ticket, allDates, onUpdate, eventDateTicketMap } = this.props;
		if ( ! isModelEntityOfModel( ticket, TICKET ) ) {
			return null;
		}
		let sidebarMenuItems = [];
		sidebarMenuItems.push( this.mainDropDownMenu( ticket ) );
		sidebarMenuItems.push( this.editTicketMenuItem( ticket ) );
		sidebarMenuItems.push( this.calculatePriceMenuItem( ticket ) );
		sidebarMenuItems.push( this.assignDatesMenuItem( ticket ) );
		sidebarMenuItems = applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			ticket
		);

		return ticket && ticket.id ? (
			<div
				id={ `ee-editor-ticket-actions-menu-${ ticket.id }` }
				className={ 'ee-editor-ticket-actions-menu' }
			>
				{ this.renderSidebarMenuItems( ticket, sidebarMenuItems ) }
				<EditTicketFormModal
					ticket={ ticket }
					closeModal={ this.toggleEditor }
					editorOpen={ this.state.editorOpen }
				/>
				<DatesAndTicketsManagerModal
					dates={ allDates }
					tickets={ [ ticket ] }
					eventDateTicketMap={ eventDateTicketMap }
					closeModal={ this.toggleTickets }
					editorOpen={ this.state.assignDates }
					onUpdate={ onUpdate }
					modalProps={ {
						title: sprintf(
							_x(
								'Date Assignments for Ticket:  %1$s',
								'Date Assignments for Ticket:  Ticket name',
								'event_espresso'
							),
							ticket.name
						),
						closeButtonLabel: null,
					} }
				/>
				<TicketPriceCalculatorFormModal
					ticket={ ticket }
					closeModal={ this.toggleCalculator }
					editorOpen={ this.state.calculator }
				/>
			</div>
		) : null;
	}
}

export default withSelect( ( select, ownProps ) => {
	const ticket = ownProps.ticket;
	if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
		select( 'eventespresso/core' ).getRelatedEntities( ticket, 'prices' );
	}
	return { ...ownProps };
} )( EditorTicketActionsMenu );
