/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { Fragment, useCallback } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import {
	DropDownMenu,
	EntityActionMenuItem,
	IconMenuItem,
} from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { withEditorDateTicketEntities } from '../../../hocs';
import { withDateEntityFormModal } from '../edit-form';
import { withCopyDateEntity, withTrashDateEntity } from '../action-handlers';
import { withTicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import './style.css';

const DEFAULT_EMPTY_ARRAY = [];

const EditorDateEntityActionsMenu = ( {
	dateEntity,
	toggleDateEditor,
	toggleTicketAssignments,
	copyDateEntity,
	trashDateEntity,
	ticketEntities = DEFAULT_EMPTY_ARRAY,
} ) => {
	/**
	 * @function
	 * @param {BaseEntity} dateEntity    	 Datetime BaseEntity instance
	 * @return {DropDownMenu}    		 Edit Event Date DropDownMenu
	 */
	const mainDropDownMenu = useCallback(
		() => {
			return (
				<DropDownMenu
					tooltip={ __( 'event date main menu', 'event_espresso' ) }
					htmlClass={ `editor-date-${ dateEntity.id }` }
					menuItems={ [
						{
							title: __( 'edit date', 'event_espresso' ),
							icon: 'edit',
							onClick: toggleDateEditor,
						},
						{
							title: __( 'copy date', 'event_espresso' ),
							icon: 'admin-page',
							onClick: copyDateEntity,
						},
						{
							title: __( 'trash date', 'event_espresso' ),
							icon: 'trash',
							onClick: trashDateEntity,
						},
					] }
				/>
			);
		}, [ dateEntity, toggleDateEditor, copyDateEntity, trashDateEntity ]
	);

	/**
	 * @function
	 * @param {Object} dateEntity    JSON object defining the Event Date
	 * @return {IconMenuItem}    Edit Event Date IconMenuItem
	 */
	const editDateMenuItem = useCallback(
		() => {
			return (
				<IconMenuItem
					index={ 1 }
					tooltip={ __( 'edit date', 'event_espresso' ) }
					id={ `edit-date-${ dateEntity.id }` }
					htmlClass="edit-date"
					dashicon="edit"
					onClick={ toggleDateEditor }
				/>
			);
		},
		[ dateEntity, toggleDateEditor ]
	);

	/**
	 * @function
	 * @param {Object} dateEntity JSON object defining the Event Date
	 * @param {Array} ticketEntities    Tickets for Event Date
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	const viewTicketsMenuItem = useCallback(
		() => {
			const tooltip = isEmpty( ticketEntities ) ?
				__(
					'warning! no assigned tickets - click to fix',
					'event_espresso'
				) :
				__( 'assign tickets', 'event_espresso' );
			return (
				<IconMenuItem
					index={ 2 }
					tooltip={ tooltip }
					id={ `view-tickets-date-${ dateEntity.id }` }
					htmlClass="view-tickets-date"
					dashicon="tickets-alt"
					onClick={ toggleTicketAssignments }
					itemCount={ ticketEntities.length }
				/>
			);
		},
		[ dateEntity, ticketEntities, toggleTicketAssignments ]
	);

	/**
	 * @function
	 * @param {Object} dateEntity    	 JSON object defining the Event Date
	 * @param {Array} ticketEntities    Tickets for Event Date
	 * @return {Array}    				 Array of IconMenuItem objects
	 */
	const getSidebarMenuItems = useCallback(
		() => {
			const sidebarMenuItems = [];
			sidebarMenuItems.push(
				mainDropDownMenu()
			);
			sidebarMenuItems.push( editDateMenuItem() );
			sidebarMenuItems.push(
				viewTicketsMenuItem()
			);
			return applyFilters(
				'FHEE__EditorDateEntityActionsMenu__SidebarMenuItems',
				sidebarMenuItems,
				dateEntity
			);
		},
		[ mainDropDownMenu, editDateMenuItem, viewTicketsMenuItem ]
	);

	/**
	 * @function
	 * @param {Object} dateEntity    	JSON object defining the Event Date
	 * @param {Array} ticketEntities 	Tickets for Event Date
	 * @return {Array} Array of rendered IconMenuItem list items
	 */
	const sidebarMenu = useCallback(
		() => {
			const sidebarMenuItems = getSidebarMenuItems();
			return sidebarMenuItems.map(
				function( sidebarMenuItem, index ) {
					return (
						sidebarMenuItem && sidebarMenuItem.type &&
						(
							sidebarMenuItem.type === DropDownMenu ||
							sidebarMenuItem.type === EntityActionMenuItem ||
							sidebarMenuItem.type === IconMenuItem
						) ?
							<Fragment key={ index }>
								{ sidebarMenuItem }
							</Fragment> :
							null
					);
				},
			);
		},
		[ getSidebarMenuItems ]
	);

	return dateEntity && dateEntity.id ? (
		<div
			id={ `ee-editor-date-actions-menu-${ dateEntity.id }` }
			className={ 'ee-editor-date-actions-menu' }
		>
			{ sidebarMenu() }
		</div>
	) : null;
};

export default compose( [
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
	withCopyDateEntity,
	withTrashDateEntity,
] )( EditorDateEntityActionsMenu );
