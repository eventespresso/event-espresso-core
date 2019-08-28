/**
 * External imports
 */
import { useEffect } from '@wordpress/element';
import { useEntityActionMenuItems } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';

/**
 * Internal dependencies
 */
import './style.css';
import AssignDatesMenuItem from './menu-items/assign-dates-menu-item';
import EditTicketDetailsMenuItem
	from './menu-items/edit-ticket-details-menu-item';
import TicketEntityMainMenuItem
	from './menu-items/ticket-entity-main-menu-item';
import EditTicketFormModal from '../edit-form/edit-ticket-form-modal';
import TicketPriceCalculatorMenuItem
	from '../price-calculator/ticket-price-calculator-menu-item';

const EditorTicketActionsMenu = ( {
	ticketEntity,
	toggleTicketAssignments,
} ) => {
	const {
		getActionsMenuForEntity,
		registerEntityActionsMenuItem,
	} = useEntityActionMenuItems();

	const menuItems = getActionsMenuForEntity( ticketEntity );
	useEffect( () => {
		if ( Array.isArray( menuItems ) && menuItems.length < 1 ) {
			registerEntityActionsMenuItem(
				ticketEntity,
				'main-menu',
				() => (
					<TicketEntityMainMenuItem
						key={ `main-menu-${ ticketEntity.id }` }
						ticketEntity={ ticketEntity }
					/>
				),
			);
			registerEntityActionsMenuItem(
				ticketEntity,
				'edit-details',
				() => (
					<EditTicketDetailsMenuItem
						key={ `edit-details-${ ticketEntity.id }` }
						ticketEntity={ ticketEntity }
					/>
				),
			);
			registerEntityActionsMenuItem(
				ticketEntity,
				'assign-dates',
				() => (
					<AssignDatesMenuItem
						key={ `assign-dates-${ ticketEntity.id }` }
						ticketEntity={ ticketEntity }
						toggleTicketAssignments={ toggleTicketAssignments }
					/>
				),
			);
			registerEntityActionsMenuItem(
				ticketEntity,
				'price-calculator',
				() => (
					<TicketPriceCalculatorMenuItem
						key={ `price-calculator-${ ticketEntity.id }` }
						ticketEntity={ ticketEntity }
					/>
				),
			);
		}
	}, [ ticketEntity ] );
	return (
		<>
			<div className={ 'ee-editor-ticket-actions-menu' }>
				{ menuItems }
			</div>
			<EditTicketFormModal ticketEntity={ ticketEntity } />
		</>
	);
};

export default ifValidTicketEntity( EditorTicketActionsMenu );
