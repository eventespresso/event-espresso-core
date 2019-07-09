/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import { entityActionsMenu } from '@eventespresso/components';
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
	const mainDropDownMenu = useMemo(
		() => (
			<DateEntityMainMenuItem
				dateEntity={ dateEntity }
				toggleDateEditor={ toggleDateEditor }
			/>
		),
		[ dateEntity, toggleDateEditor ]
	);
	const editDateMenuItem = useMemo(
		() => (
			<EditDateDetailsMenuItem
				dateEntity={ dateEntity }
				toggleDateEditor={ toggleDateEditor }
			/>
		),
		[ dateEntity, toggleDateEditor ]
	);
	const assignTicketsMenuItem = useMemo(
		() => (
			<AssignTicketsMenuItem
				dateEntity={ dateEntity }
				toggleTicketAssignments={ toggleTicketAssignments }
				ticketEntities={ ticketEntities }
			/>
		),
		[ dateEntity, ticketEntities, toggleTicketAssignments ]
	);
	return (
		<div
			id={ `ee-editor-date-actions-menu-${ dateEntity.id }` }
			className={ 'ee-editor-date-actions-menu' }
		>
			{ mainDropDownMenu }
			{ editDateMenuItem }
			{ assignTicketsMenuItem }
			{ entityActionsMenu( 'datetime', dateEntity, 3 ) }
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
