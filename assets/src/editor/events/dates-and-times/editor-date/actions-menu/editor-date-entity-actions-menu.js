/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import {
	DropDownMenu,
	EntityActionMenuItem,
	IconMenuItem,
} from '@eventespresso/components';
import { __, sprintf, _x } from '@eventespresso/i18n';
import { withEditor } from '@eventespresso/editor-hocs';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { withEditorDateTicketEntities } from '../../../hocs';
import { DateEntityFormModal } from '../edit-form';
import { withCopyDateEntity, withTrashDateEntity } from '../action-handlers';
import { withTicketAssignmentsManagerModal } from '../../../ticket-assignments-manager';
import './style.css';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const DEFAULT_EMPTY_ARRAY = [];

/**
 * EditorDateEntityActionsMenu
 * menu of IconButtons for performing actions on the supplied Event Date
 *
 * @constructor
 * @param {BaseEntity} dateEntity Datetime entity instance
 * @return {Object} rendered menu
 */
class EditorDateEntityActionsMenu extends Component {
	/**
	 * @function
	 * @param {BaseEntity} dateEntity    	 Datetime BaseEntity instance
	 * @return {DropDownMenu}    		 Edit Event Date DropDownMenu
	 */
	mainDropDownMenu = ( dateEntity ) => {
		return (
			<DropDownMenu
				tooltip={ __( 'event date main menu', 'event_espresso' ) }
				htmlClass={ `editor-date-${ dateEntity.id }` }
				menuItems={ [
					{
						title: __( 'edit date', 'event_espresso' ),
						icon: 'edit',
						onClick: this.props.toggleEditor,
					},
					{
						title: __( 'copy date', 'event_espresso' ),
						icon: 'admin-page',
						onClick: this.props.copyDateEntity,
					},
					{
						title: __( 'trash date', 'event_espresso' ),
						icon: 'trash',
						onClick: this.props.trashDateEntity,
					},
				] }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} dateEntity    JSON object defining the Event Date
	 * @return {IconMenuItem}    Edit Event Date IconMenuItem
	 */
	editDateMenuItem = ( dateEntity ) => {
		return (
			<IconMenuItem
				index={ 1 }
				tooltip={ __( 'edit date', 'event_espresso' ) }
				id={ `edit-date-${ dateEntity.id }` }
				htmlClass="edit-date"
				dashicon="edit"
				onClick={ this.props.toggleEditor }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} dateEntity JSON object defining the Event Date
	 * @param {Array} ticketEntities    Tickets for Event Date
	 * @param {boolean} ticketEntitiesLoaded
	 * @return {IconMenuItem}    View Tickets for Event Date IconMenuItem
	 */
	viewTicketsMenuItem = ( dateEntity, ticketEntities ) => {
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
				onClick={ this.props.toggleTicketAssignments }
				itemCount={ ticketEntities.length || null }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} dateEntity    	 JSON object defining the Event Date
	 * @param {Array} ticketEntities    Tickets for Event Date
	 * @return {Array}    				 Array of IconMenuItem objects
	 */
	getSidebarMenuItems = ( dateEntity, ticketEntities ) => {
		const sidebarMenuItems = [];
		sidebarMenuItems.push(
			this.mainDropDownMenu( dateEntity )
		);
		sidebarMenuItems.push( this.editDateMenuItem( dateEntity ) );
		sidebarMenuItems.push(
			this.viewTicketsMenuItem( dateEntity, ticketEntities )
		);
		return applyFilters(
			'FHEE__EditorDateEntityActionsMenu__SidebarMenuItems',
			sidebarMenuItems,
			dateEntity
		);
	};

	/**
	 * @function
	 * @param {Object} dateEntity    	JSON object defining the Event Date
	 * @param {Array} ticketEntities 	Tickets for Event Date
	 * @return {Array} Array of rendered IconMenuItem list items
	 */
	sidebarMenu = ( dateEntity, ticketEntities ) => {
		const sidebarMenuItems = this.getSidebarMenuItems(
			dateEntity,
			ticketEntities,
		);
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
	};

	render() {
		const {
			eventEntity,
			dateEntity,
			editorOpen,
			toggleEditor,
			ticketEntities = DEFAULT_EMPTY_ARRAY,
		} = this.props;
		if ( ! isModelEntityOfModel( dateEntity, DATETIME ) ) {
			return null;
		}
		return dateEntity && dateEntity.id ? (
			<div
				id={ `ee-editor-date-actions-menu-${ dateEntity.id }` }
				className={ 'ee-editor-date-actions-menu' }
			>
				{ this.sidebarMenu( dateEntity, ticketEntities ) }
				<DateEntityFormModal
					eventEntity={ eventEntity }
					dateEntity={ dateEntity }
					toggleEditor={ toggleEditor }
					editorOpen={ editorOpen }
				/>
			</div>
		) : null;
	}
}

export default compose( [
	withEditor,
	withEditorDateTicketEntities,
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
