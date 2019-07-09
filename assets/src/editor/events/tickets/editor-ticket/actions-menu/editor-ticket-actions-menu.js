/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import { entityActionsMenu } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { sprintf, _x } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { withEditorTicketDateEntities } from '../../../hocs';
import withTicketEntityFormModal from '../edit-form/with-ticket-entity-form-modal';
import {
	TicketPriceCalculatorMenuItem,
	withTicketPriceCalculatorFormModal,
} from '../price-calculator';
import {
	withTicketAssignmentsManagerModal,
} from '../../../ticket-assignments-manager';
import AssignDatesMenuItem from './menu-items/assign-dates-menu-item';
import EditTicketDetailsMenuItem from './menu-items/edit-ticket-details-menu-item';
import TicketEntityMainMenuItem from './menu-items/ticket-entity-main-menu-item';
import './style.css';

const EditorTicketActionsMenu = ( {
	ticketEntity,
	toggleTicketEditor,
	dateEntities = [],
	noBasePrice = false,
	toggleTicketAssignments,
	toggleCalculator,
	doRefresh,
} ) => {
	const ticketEntityMainMenuItem = useMemo(
		() => (
			<TicketEntityMainMenuItem
				ticketEntity={ ticketEntity }
				toggleTicketEditor={ toggleTicketEditor }
				dateEntities={ dateEntities }
			/>
		),
		[ ticketEntity, toggleTicketEditor ]
	);
	const editTicketDetailsMenuItem = useMemo(
		() => (
			<EditTicketDetailsMenuItem
				ticketEntity={ ticketEntity }
				toggleTicketEditor={ toggleTicketEditor }
			/>
		),
		[ ticketEntity, toggleTicketEditor ]
	);
	const assignDatesMenuItem = useMemo(
		() => (
			<AssignDatesMenuItem
				ticketEntity={ ticketEntity }
				toggleTicketAssignments={ toggleTicketAssignments }
				dateEntities={ dateEntities }
			/>
		),
		[ ticketEntity, dateEntities, toggleTicketAssignments ]
	);
	const ticketPriceCalculatorMenuItem = useMemo(
		() => (
			<TicketPriceCalculatorMenuItem
				ticketEntity={ ticketEntity }
				noBasePrice={ noBasePrice }
				doRefresh={ doRefresh }
				toggleCalculator={ toggleCalculator }
			/>
		),
		[ ticketEntity, noBasePrice, doRefresh, toggleCalculator ]
	);
	return (
		<div className={ 'ee-editor-ticket-actions-menu' }>
			{ ticketEntityMainMenuItem }
			{ editTicketDetailsMenuItem }
			{ assignDatesMenuItem }
			{ ticketPriceCalculatorMenuItem }
			{ entityActionsMenu( 'ticket', ticketEntity, 4 ) }
		</div>
	);
};

export default compose( [
	ifValidTicketEntity,
	withEditorTicketDateEntities,
	withTicketPriceCalculatorFormModal,
	withTicketEntityFormModal,
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
] )( EditorTicketActionsMenu );
