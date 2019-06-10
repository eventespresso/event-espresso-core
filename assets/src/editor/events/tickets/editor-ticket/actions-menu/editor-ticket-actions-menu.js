/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { Fragment, isValidElement } from '@wordpress/element';
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
import { withTicketDateEntities, withTicketPriceEntities } from '../../data';
import withEditTicketEntityFormModal from '../edit-form/with-edit-ticket-entity-form-modal';
import { withCopyTicketEntity, withTrashTicketEntity } from '../action-handlers';
import {
	TicketPriceCalculatorMenuItem,
	withTicketPriceCalculatorFormModal,
} from '../price-calculator';
import { withTicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import './style.css';

const EditTicketMenuItem = ( {
	ticketEntity,
	toggleTicketEditor,
} ) => {
	return <IconMenuItem
		index={ 1 }
		tooltip={ __( 'edit ticket details', 'event_espresso' ) }
		id={ `edit-ticket-${ ticketEntity.id }` }
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
	ticketEntity,
	toggleTicketEditor,
	dateEntities = [],
	dateEntitiesLoaded = false,
	noBasePrice = false,
	copyTicketEntity,
	trashTicketEntity,
	toggleTicketAssignments,
	toggleCalculator,
	doRefresh,
} ) => {
	const mainDropDownMenu = () => {
		return (
			<DropDownMenu
				tooltip={ __( 'ticket main menu', 'event_espresso' ) }
				tooltipPosition="top right"
				htmlClass={ `editor-ticket-${ ticketEntity.id }` }
				menuItems={ [
					{
						title: __( 'edit ticket', 'event_espresso' ),
						icon: 'edit',
						onClick: toggleTicketEditor,
						ticketEntity,
					},
					{
						title: __( 'copy ticket', 'event_espresso' ),
						icon: 'admin-page',
						onClick: () => copyTicketEntity(
							ticketEntity,
							dateEntities,
							dateEntitiesLoaded
						),
					},
					{
						title: __( 'trash ticket', 'event_espresso' ),
						icon: 'trash',
						onClick: () => trashTicketEntity( ticketEntity ),
					},
				] }
			/>
		);
	};

	const assignDatesMenuItem = () => {
		const tooltip = dateEntitiesLoaded && isEmpty( dateEntities ) ?
			__(
				'warning! no assigned ticket dates - click to fix',
				'event_espresso'
			) :
			__( 'assign ticket to event dates', 'event_espresso' );
		return (
			<IconMenuItem
				index={ 2 }
				tooltip={ tooltip }
				id={ `assign-ticket-dates-ticket-${ ticketEntity.id }` }
				htmlClass={ 'assign-ticket-dates' }
				dashicon={ <EspressoIcon icon="calendar" /> }
				tooltipPosition="top right"
				onClick={ toggleTicketAssignments }
				itemCount={ dateEntitiesLoaded ? dateEntities.length : null }
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
				ticketEntity={ ticketEntity }
				noBasePrice={ noBasePrice }
				toggleTicketEditor={ toggleTicketEditor }
				toggleCalculator={ toggleCalculator }
				doRefresh={ doRefresh }
			/>
		);
		sidebarMenuItems.push( <TicketPriceCalculatorMenuItem
			ticketEntity={ ticketEntity }
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
			ticketEntity
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

	if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
		return null;
	}

	const sidebarMenuItems = getSidebarMenuItems();

	return ticketEntity && ticketEntity.id ? (
		<div
			id={ `ee-editor-ticket-actions-menu-${ ticketEntity.id }` }
			className={ 'ee-editor-ticket-actions-menu' }
		>
			{ sidebarMenu( sidebarMenuItems ) }
		</div>
	) : null;
};

export default compose( [
	withTicketPriceCalculatorFormModal,
	withEditTicketEntityFormModal,
	withTicketAssignmentsManagerModal( ( { ticketEntity } ) => (
		{
			title: sprintf(
				_x(
					'Date Assignments for Ticket:  %1$s',
					'Date Assignments for Ticket:  Ticket name',
					'event_espresso'
				),
				ticketEntity.name
			),
			closeButtonLabel: null,
		}
	) ),
	withTicketDateEntities,
	withCopyTicketEntity,
	withTrashTicketEntity,
] )( EditorTicketActionsMenu );
