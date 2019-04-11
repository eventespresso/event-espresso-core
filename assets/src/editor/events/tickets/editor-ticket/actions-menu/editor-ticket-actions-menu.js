/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import {
	DropDownMenu,
	EspressoIcon,
	IconMenuItem,
} from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { EditTicketFormModal } from '../';
import { copyTicket, trashTicket } from '../action-handlers';
import { EntityActionMenuItem } from '../../../entity-action-menu-item';
import { TicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
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
	 * opens and closes TicketAssignmentsManagerModal
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
						onClick: this.toggleEditor,
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
				onClick={ this.toggleEditor }
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
				onClick={ this.toggleTickets }
				itemCount={ datesLoaded ? relatedDates.length : null }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket JSON object defining the Ticket
	 * @param {Array} prices
	 * @param {boolean} pricesLoaded
	 * @return {IconMenuItem}    View Tickets for Ticket IconMenuItem
	 */
	calculatePriceMenuItem = ( ticket, prices, pricesLoaded ) => {
		const noBasePrice = pricesLoaded && isEmpty( prices );
		const tooltip = noBasePrice ?
			__( 'warning! no ticket price set - click to fix', 'event_espresso' ) :
			__( 'ticket price calculator', 'event_espresso' );
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ tooltip }
				id={ `calculate-ticket-price-ticket-${ ticket.id }` }
				htmlClass={ 'calculate-tickets-price' }
				dashicon={ <EspressoIcon icon="calculator" /> }
				tooltipPosition="top right"
				onClick={ this.toggleCalculator }
				itemCount={ noBasePrice ? 0 : null }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket 	model object defining the Ticket
	 * @param {Array} relatedDates    Event Dates for the Ticket
	 * @param {boolean} datesLoaded
	 * @param {Array} prices
	 * @param {boolean} pricesLoaded
	 * @return {Array}          Array of IconMenuItem objects
	 */
	getSidebarMenuItems = (
		ticket,
		relatedDates,
		datesLoaded,
		prices,
		pricesLoaded
	) => {
		const sidebarMenuItems = [];
		sidebarMenuItems.push(
			this.mainDropDownMenu( ticket, relatedDates, datesLoaded )
		);
		sidebarMenuItems.push( this.editTicketMenuItem( ticket ) );
		sidebarMenuItems.push(
			this.calculatePriceMenuItem( ticket, prices, pricesLoaded )
		);
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
	 * @param {Object} ticket 		model object defining the Ticket
	 * @param {Array} relatedDates 	Event Dates for the Ticket
	 * @param {boolean} datesLoaded
	 * @param {Array} prices
	 * @param {boolean} pricesLoaded
	 * @return {Array} 				Array of rendered IconMenuItem list items
	 */
	sidebarMenu = (
		ticket,
		relatedDates,
		datesLoaded,
		prices,
		pricesLoaded
	) => {
		const sidebarMenuItems = this.getSidebarMenuItems(
			ticket,
			relatedDates,
			datesLoaded,
			prices,
			pricesLoaded
		);
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
		const {
			ticket,
			allDates,
			relatedDates,
			datesLoaded,
			prices,
			pricesLoaded,
		} = this.props;
		if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
			return null;
		}
		return ticket && ticket.id ? (
			<div
				id={ `ee-editor-ticket-actions-menu-${ ticket.id }` }
				className={ 'ee-editor-ticket-actions-menu' }
			>
				{ this.sidebarMenu(
					ticket,
					relatedDates,
					datesLoaded,
					prices,
					pricesLoaded
				) }
				<EditTicketFormModal
					ticket={ ticket }
					closeModal={ this.toggleEditor }
					editorOpen={ this.state.editorOpen }
				/>
				<TicketAssignmentsManagerModal
					ticket={ ticket }
					allDates={ allDates }
					closeModal={ this.toggleTickets }
					editorOpen={ this.state.assignDates }
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
	const { getRelatedEntities } = select( 'eventespresso/core' );
	const { hasFinishedResolution } = select( 'core/data' );
	const ticket = ownProps.ticket;
	let prices = [];
	let relatedDates = [];
	let datesLoaded = false;
	let pricesLoaded = false;
	if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
		relatedDates = getRelatedEntities( ticket, 'datetimes' );
		prices = getRelatedEntities( ticket, 'prices' );
		datesLoaded = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ ticket, 'datetimes' ]
		);
		pricesLoaded = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ ticket, 'prices' ]
		);
	}
	return { relatedDates, datesLoaded, prices, pricesLoaded };
} )( EditorTicketActionsMenu );
