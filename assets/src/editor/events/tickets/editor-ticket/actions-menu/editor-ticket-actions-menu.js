/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { Fragment, isValidElement, useCallback } from '@wordpress/element';
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
import { withTicketDatetimes, withTicketPrices } from '../../data';
import withEditTicketFormModal from '../edit-form/with-edit-ticket-form-modal';
import { withCopyTicket, withTrashTicket } from '../action-handlers';
import {
	TicketPriceCalculatorMenuItem,
	withTicketPriceCalculatorFormModal
} from '../price-calculator';
import { withTicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import './style.css';

const EditTicketMenuItem = ( {
	ticket,
	toggleTicketEditor,
} ) => {
	return <IconMenuItem
		index={ 1 }
		tooltip={ __( 'edit ticket details', 'event_espresso' ) }
		id={ `edit-ticket-${ ticket.id }` }
		htmlClass="edit-ticket"
		dashicon="edit"
		tooltipPosition="top right"
		onClick={ toggleTicketEditor }
	/>;
};

// @todo move the various render components outside of the functional component
// or wrap them with `useCallback` and the appropriate dependencies.
// right now they are regenerated every time EditorTicketActionsMenu is re-rendered.

const EditorTicketActionsMenu = ( {
	ticket,
	toggleTicketEditor,
	ticketDatetimes = [],
	datesLoaded = false,
	noBasePrice = false,
	copyTicket,
	trashTicket,
	toggleTicketAssignments,
	toggleCalculator,
	doRefresh,
} ) => {
	const mainDropDownMenu = () => {
		return (
			<DropDownMenu
				tooltip={ __( 'ticket main menu', 'event_espresso' ) }
				tooltipPosition="top right"
				htmlClass={ `editor-ticket-${ ticket.id }` }
				menuItems={ [
					{
						title: __( 'edit ticket', 'event_espresso' ),
						icon: 'edit',
						onClick: toggleTicketEditor,
						ticket,
					},
					{
						title: __( 'copy ticket', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyTicket(
							ticket,
							ticketDatetimes,
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

	const assignDatesMenuItem = () => {
		const tooltip = datesLoaded && isEmpty( ticketDatetimes ) ?
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
				onClick={ toggleTicketAssignments }
				itemCount={ datesLoaded ? ticketDatetimes.length : null }
			/>
		);
	};

	const getSidebarMenuItems = () => {
		const sidebarMenuItems = [];
		sidebarMenuItems.push(
			mainDropDownMenu()
		);
		sidebarMenuItems.push(
			<EditTicketMenuItem
				ticket={ ticket }
				noBasePrice={ noBasePrice }
				toggleTicketEditor={ toggleTicketEditor }
				toggleCalculator={ toggleCalculator }
				doRefresh={ doRefresh }
			/>
		);
		sidebarMenuItems.push( <TicketPriceCalculatorMenuItem
			ticket={ ticket }
			noBasePrice={ noBasePrice }
			doRefresh={ doRefresh }
			toggleCalculator={ toggleCalculator }
		/> );
		sidebarMenuItems.push( assignDatesMenuItem() );
		/**
		 * @todo, This could be fragile because of render execution
		 * We should explore implementing a slot/fill pattern here.
		 */
		return applyFilters(
			'FHEE__EditorDates__EditorDateSidebar__SidebarMenuItems',
			sidebarMenuItems,
			ticket
		);
	};

	const sidebarMenu = ( sidebarMenuItems ) => {
		return sidebarMenuItems.map(
			( sidebarMenuItem, index ) => {
				return (
					sidebarMenuItem && sidebarMenuItem.type &&
					(
						sidebarMenuItem.type === DropDownMenu ||
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

	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		return null;
	}

	const sidebarMenuItems = getSidebarMenuItems();

	return ticket && ticket.id ? (
		<div
			id={ `ee-editor-ticket-actions-menu-${ ticket.id }` }
			className={ 'ee-editor-ticket-actions-menu' }
		>
			{ sidebarMenu( sidebarMenuItems ) }
		</div>
	) : null;
};

export default compose( [
	withTicketPriceCalculatorFormModal,
	withEditTicketFormModal,
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
	withCopyTicket,
	withTrashTicket,
] )( EditorTicketActionsMenu );
