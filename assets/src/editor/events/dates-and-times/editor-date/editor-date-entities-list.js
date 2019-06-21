/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import {
	EntityList,
	EspressoButton,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { withEditor } from '@eventespresso/editor-hocs';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorDateEntitiesGridView } from './grid-view';
import { EditorDateEntitiesListView } from './list-view';
import { withPaginatedDateEntitiesListAndFilterBar } from './filter-bar';
import { DateEntityFormModal } from './edit-form';
import { withTicketAssignmentsManagerModal } from '../../ticket-assignments-manager';
import withUpdateEventDateRelation from './action-handlers/with-update-event-date-relation';
import { withEditorDateEntities, withEditorEventEntity } from '../../hocs';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

/**
 * EditorDateEntitiesList
 * EntityList component for displaying event dates in the editor
 *
 * @class
 * @param {Array} entities 	array of JSON objects defining the Event Dates
 * @param {string} view
 * @param {Function} retrieveDates
 * @param {mixed} otherProps
 */
class EditorDateEntitiesList extends Component {
	constructor( props ) {
		super( props );
		this.state = { newDateEntity: null };
	}

	/**
	 * @function
	 * @return {Object} rendered button
	 */
	addNewDateButton = () => {
		const addDateEntity = ( event ) => {
			if ( event && event.preventDefault ) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.addNewDateEntity(
				( state ) => this.setState( state ),
				this.props.toggleEditor
			);
		};
		return (
			<EspressoButton
				icon="calendar"
				buttonText={ __( 'Add New Date', 'event_espresso' ) }
				onClick={ addDateEntity }
			/>
		);
	};

	/**
	 * @function
	 * @return {Object} rendered button
	 */
	ticketAssignmentsButton = () => {
		return (
			<EspressoButton
				icon="tickets-alt"
				buttonText={ __(
					'Ticket Assignments',
					'event_espresso'
				) }
				onClick={ this.props.toggleTicketAssignments }
			/>
		);
	};

	render() {
		const {
			view,
			entities,
			editorOpen,
			toggleEditor,
			...otherProps
		} = this.props;
		const entityIds = entities.map( ( entity ) => entity.id ).join( '-' );
		return (
			<FormWrapper>
				<EntityList
					{ ...otherProps }
					key={ entityIds }
					entities={ entities }
					EntityGridView={ EditorDateEntitiesGridView }
					EntityListView={ EditorDateEntitiesListView }
					view={ view }
					loadingNotice={ sprintf(
						_x(
							'loading event dates%s',
							'loading event dates...',
							'event_espresso'
						),
						String.fromCharCode( 8230 )
					) }
				/>
				<FormSaveCancelButtons
					submitButton={ this.addNewDateButton() }
					cancelButton={ this.ticketAssignmentsButton() }
				/>
				<DateEntityFormModal
					dateEntity={ this.state.newDateEntity }
					toggleEditor={ toggleEditor }
					editorOpen={ editorOpen }
				/>
			</FormWrapper>
		);
	}
}

export default compose( [
	withEditor,
	withEditorDateEntities,
	withPaginatedDateEntitiesListAndFilterBar(),
	withEditorEventEntity,
	withUpdateEventDateRelation,
	withDispatch( (
		dispatch,
		{ updateEventDateRelation }
	) => {
		const { createEntity } = dispatch( 'eventespresso/core' );
		const addNewDateEntity = ( setState, toggleEditor ) => {
			createEntity( 'datetime', {} ).then(
				( newDateEntity ) => {
					setState( { newDateEntity } );
					updateEventDateRelation( newDateEntity );
					toggleEditor();
				},
			);
		};
		return { addNewDateEntity };
	} ),
	withTicketAssignmentsManagerModal( () => (
		{
			title: __(
				'Ticket Assignments for All Event Dates',
				'event_espresso'
			),
			closeButtonLabel: null,
		}
	) ),
] )( EditorDateEntitiesList );
