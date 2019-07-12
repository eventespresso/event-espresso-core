/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import {
	getActionsMenuForEntity,
	registerEntityActionsMenuItem,
} from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { sprintf, _x } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { withEditorDateTicketEntities } from '../../../hocs';
import { withDateEntityFormModal } from '../edit-form';
import { withTicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import AssignTicketsMenuItem from './menu-items/assign-tickets-menu-item';
import DateEntityMainMenuItem from './menu-items/date-entity-main-menu-item';
import EditDateDetailsMenuItem from './menu-items/edit-date-details-menu-item';
import './style.css';

const DEFAULT_EMPTY_ARRAY = [];

const EditorDateEntityActionsMenu = ( {
	dateEntity,
	toggleDateEditor,
	toggleTicketAssignments,
	ticketEntities = DEFAULT_EMPTY_ARRAY,
} ) => {
	registerEntityActionsMenuItem(
		dateEntity,
		'main-menu',
		() => (
			<DateEntityMainMenuItem
				key={ `main-menu-${ dateEntity.id }` }
				dateEntity={ dateEntity }
				toggleDateEditor={ toggleDateEditor }
			/>
		)
	);
	registerEntityActionsMenuItem(
		dateEntity,
		'edit-details',
		() => (
			<EditDateDetailsMenuItem
				key={ `edit-details-${ dateEntity.id }` }
				dateEntity={ dateEntity }
				toggleDateEditor={ toggleDateEditor }
			/>
		)
	);
	registerEntityActionsMenuItem(
		dateEntity,
		'assign-tickets',
		() => (
			<AssignTicketsMenuItem
				key={ `assign-tickets-${ dateEntity.id }` }
				dateEntity={ dateEntity }
				toggleTicketAssignments={ toggleTicketAssignments }
				ticketEntities={ ticketEntities }
			/>
		)
	);
	const actionMenuItems = useMemo(
		() => getActionsMenuForEntity( dateEntity ),
		[
			dateEntity,
			toggleDateEditor,
			toggleTicketAssignments,
			ticketEntities,
		]
	);

	return (
		<div
			id={ `ee-editor-date-actions-menu-${ dateEntity.id }` }
			className={ 'ee-editor-date-actions-menu' }
		>
			{ actionMenuItems }
		</div>
	);
};

export default compose( [
	ifValidDateEntity,
	withEditorDateTicketEntities,
	withDateEntityFormModal,
	withTicketAssignmentsManagerModal(
		( { dateEntity } ) => ( {
			title: sprintf(
				_x(
					'Ticket Assignments for: %1$s',
					'Ticket Assignments for: Date & date name',
					'event_espresso'
				),
				`${ dateEntity.name } (${
					dateEntity.start.toFormat( 'ddd MMM DD, YYYY' )
				})`
			),
			closeButtonLabel: null,
		} )
	),
] )( EditorDateEntityActionsMenu );
