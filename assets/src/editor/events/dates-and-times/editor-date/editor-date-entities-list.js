/**
 * External imports
 */
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import {
	useEffect,
	useMemo,
	useState,
	useCallback,
	useReducer,
} from '@wordpress/element';
import {
	EntityList,
	EspressoButton,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorDateEntitiesGridView } from './grid-view';
import { EditorDateEntitiesListView } from './list-view';
import { withPaginatedDateEntitiesListAndFilterBar } from './filter-bar';
import { withDateEntityFormModal } from './edit-form';
import { withTicketAssignmentsManagerModal } from '../../ticket-assignments-manager';
import withUpdateEventDateRelation from './action-handlers/with-update-event-date-relation';
import { withEditorDateEntities, withEditorEventEntity } from '../../hocs';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const EditorDateEntitiesList = ( {
	view = 'grid',
	entities,
	toggleDateEditor,
	addNewDateEntity,
	toggleTicketAssignments,
	dateEntity = null,
	...otherProps
} ) => {
	useEffect( () => {
		if ( dateEntity !== null ) {
			toggleDateEditor();
		}
	}, [ dateEntity, toggleDateEditor ] );
	const addNewDateEntityButton = useMemo(
		() => (
			<EspressoButton
				icon={ 'calendar' }
				buttonText={ __( 'Add New Date', 'event_espresso' ) }
				onClick={ addNewDateEntity }
			/>
		),
		[ addNewDateEntity ]
	);
	const ticketAssignmentsButton = useMemo(
		() => (
			<EspressoButton
				icon={ 'tickets-alt' }
				buttonText={ __(
					'Ticket Assignments',
					'event_espresso'
				) }
				onClick={ toggleTicketAssignments }
			/>
		),
		[ toggleTicketAssignments ]
	);
	return (
		<FormWrapper>
			<EntityList
				{ ...otherProps }
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
				submitButton={ addNewDateEntityButton }
				cancelButton={ ticketAssignmentsButton }
			/>
		</FormWrapper>
	);
};

const withNewDateEntity = createHigherOrderComponent(
	( WrappedComponent ) => ( {
		updateEventDateRelation,
		...otherProps
	} ) => {
		const [ newDateEntity, setNewDateEntity ] = useState( null );
		const { createEntity } = useDispatch( 'eventespresso/core' );
		const addNewDateEntity = useCallback(
			async ( event ) => {
				if ( event && event.preventDefault ) {
					event.preventDefault();
					event.stopPropagation();
				}
				const newDate = await createEntity( 'datetime', {} );
				setNewDateEntity( newDate );
				updateEventDateRelation( newDate );
			},
			[ createEntity, updateEventDateRelation ]
		);
		return <WrappedComponent
			dateEntity={ newDateEntity }
			addNewDateEntity={ addNewDateEntity }
			{ ...otherProps }
		/>;
	},
	'withNewDateEntity'
);

export default compose( [
	withEditorEventEntity,
	withUpdateEventDateRelation,
	( WrappedComponent ) => ( props ) => {
		const [ refreshed, doRefresh ] = useReducer( ( s ) => s + 1, 0 );
		const refresher = () => {
			doRefresh( {} );
		};
		return <WrappedComponent
			{ ...props }
			doRefresh={ refresher }
			refreshed={ refreshed }
		/>;
	},
	withNewDateEntity,
	withEditorDateEntities,
	withPaginatedDateEntitiesListAndFilterBar(),
	withTicketAssignmentsManagerModal( () => (
		{
			title: __(
				'Ticket Assignments for All Event Dates',
				'event_espresso'
			),
			closeButtonLabel: null,
		}
	) ),
	createHigherOrderComponent(
		( WrappedComponent ) => ( props ) => {
			return <WrappedComponent
				{ ...props }
				onCloseDateEditor={ props.toggleTicketAssignments }
			/>;
		}
	),
	withDateEntityFormModal,
] )( EditorDateEntitiesList );
