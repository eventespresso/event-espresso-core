/**
 * External imports
 */
import { useEffect } from '@wordpress/element';
import { useEntityActionMenuItems } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';

/**
 * Internal dependencies
 */
import './style.css';
import AssignTicketsMenuItem from './menu-items/assign-tickets-menu-item';
import DateEntityMainMenuItem from './menu-items/date-entity-main-menu-item';
import EditDateDetailsMenuItem from './menu-items/edit-date-details-menu-item';
import DateEntityFormModal from '../edit-form/date-entity-form-modal';

const EditorDateEntityActionsMenu = ( { dateEntity } ) => {
	const {
		getActionsMenuForEntity,
		registerEntityActionsMenuItem,
	} = useEntityActionMenuItems();

	useEffect( () => {
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
				/>
			)
		);
	} );

	return (
		<>
			<div
				id={ `ee-editor-date-actions-menu-${ dateEntity.id }` }
				className={ 'ee-editor-date-actions-menu' }
			>
				{ getActionsMenuForEntity( dateEntity ) }
			</div>
			<DateEntityFormModal dateEntity={ dateEntity } />
		</>
	);
};

export default ifValidDateEntity( EditorDateEntityActionsMenu );
