/**
 * External imports
 */
import { useEffect, useState } from '@wordpress/element';
import { useEntityActionMenuItems } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import PropTypes from 'prop-types';

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
import useTicketEditorId from '../edit-form/use-ticket-editor-id';

const EditorTicketActionsMenu = ( { ticketEntity } ) => {
	const editorId = useTicketEditorId( ticketEntity );
	const [ menuItems, setMenuItems ] = useState( [] );
	const {
		getActionsMenuForEntity,
		registerEntityActionsMenuItem,
	} = useEntityActionMenuItems();

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
			setMenuItems( getActionsMenuForEntity( ticketEntity ) );
		}
	}, [
		ticketEntity,
		getActionsMenuForEntity,
		registerEntityActionsMenuItem,
	] );
	return (
		<>
			<div className={ 'ee-editor-ticket-actions-menu' }>
				{ menuItems }
			</div>
			<EditTicketFormModal
				editorId={ editorId }
				ticketEntity={ ticketEntity }
			/>
		</>
	);
};

EditorTicketActionsMenu.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
};

export default ifValidTicketEntity( EditorTicketActionsMenu );
