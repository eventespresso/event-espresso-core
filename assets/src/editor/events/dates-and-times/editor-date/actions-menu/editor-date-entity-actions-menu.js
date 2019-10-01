/**
 * External imports
 */
import { useEffect, useState } from '@wordpress/element';
import { useEntityActionMenuItems } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.css';
import AssignTicketsMenuItem from './menu-items/assign-tickets-menu-item';
import DateEntityMainMenuItem from './menu-items/date-entity-main-menu-item';
import EditDateDetailsMenuItem from './menu-items/edit-date-details-menu-item';
import DateEntityFormModal from '../edit-form/date-entity-form-modal';
import useEventDateEditorId from '../edit-form/use-event-date-editor-id';

const EditorDateEntityActionsMenu = ( { dateEntity } ) => {
	const editorId = useEventDateEditorId( dateEntity );
	const [ menuItems, setMenuItems ] = useState( [] );
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
		setMenuItems( getActionsMenuForEntity( dateEntity ) );
	} );

	return (
		<>
			<div
				id={ `ee-editor-date-actions-menu-${ dateEntity.id }` }
				className={ 'ee-editor-date-actions-menu' }
			>
				{ menuItems }
			</div>
			<DateEntityFormModal
				editorId={ editorId }
				dateEntity={ dateEntity }
			/>
		</>
	);
};

EditorDateEntityActionsMenu.propTypes = {
	dateEntity: PropTypes.object.isRequired,
};

export default ifValidDateEntity( EditorDateEntityActionsMenu );
