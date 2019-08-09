/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useEntityActionMenuItems } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';

/**
 * Internal dependencies
 */
import { withTicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import AssignTicketsMenuItem from './menu-items/assign-tickets-menu-item';
import DateEntityMainMenuItem from './menu-items/date-entity-main-menu-item';
import EditDateDetailsMenuItem from './menu-items/edit-date-details-menu-item';
import DateEntityFormModal from '../edit-form/date-entity-form-modal';

import './style.css';

const EditorDateEntityActionsMenu = ( {
	dateEntity,
	toggleTicketAssignments,
} ) => {
	toggleTicketAssignments = toggleTicketAssignments ?
		toggleTicketAssignments :
		() => null;

	const {
		getActionsMenuForEntity,
		registerEntityActionsMenuItem,
	} = useEntityActionMenuItems();

	const menuItems = getActionsMenuForEntity( dateEntity );
	useEffect( () => {
		if ( Array.isArray( menuItems ) && menuItems.length < 1 ) {
			registerEntityActionsMenuItem(
				dateEntity,
				'main-menu',
				() => (
					<DateEntityMainMenuItem
						key={ `main-menu-${ dateEntity.id }` }
						dateEntity={ dateEntity }
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
					/>
				)
			);
		}
	}, [ dateEntity, menuItems ] );

	return (
		<>
			<div
				id={ `ee-editor-date-actions-menu-${ dateEntity.id }` }
				className={ 'ee-editor-date-actions-menu' }
			>
				{ menuItems }
			</div>
			<DateEntityFormModal dateEntity={ dateEntity } />
		</>
	);
};

export default compose( [
	ifValidDateEntity,
	withTicketAssignmentsManagerModal,
] )( EditorDateEntityActionsMenu );
