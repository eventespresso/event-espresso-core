/**
 * External dependencies
 */
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { EntityList, twoColumnAdminFormLayout } from '@eventespresso/components';
import { _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import AddNewTicketButton from './add-new-ticket-button';
import { EditorTicketEntitiesGridView } from './grid-view/';
import { EditorTicketEntitiesListView } from './list-view/';
import { withPaginatedTicketEntitiesListAndFilterBar } from './filter-bar';
import { withTicketAssignmentsManagerModal } from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const EditorTicketEntitiesList = ( {
	entities,
	toggleTicketEditor,
	ticketEntity = null,
	view = 'grid',
	...otherProps
} ) => {
	useEffect( () => {
		if ( ticketEntity !== null ) {
			toggleTicketEditor();
		}
	}, [ ticketEntity ] );

	return (
		<FormWrapper>
			<EntityList
				{ ...otherProps }
				entities={ entities }
				EntityGridView={ EditorTicketEntitiesGridView }
				EntityListView={ EditorTicketEntitiesListView }
				view={ view }
				loadingNotice={ sprintf(
					_x(
						'loading available tickets%s',
						'loading available tickets...',
						'event_espresso'
					),
					String.fromCharCode( 8230 )
				) }
			/>
			<FormSaveCancelButtons submitButton={ <AddNewTicketButton /> } />
		</FormWrapper>
	);
};

export default compose( [
	withPaginatedTicketEntitiesListAndFilterBar(),
	// add ticketAssignments ManagerModal onClose
	withTicketAssignmentsManagerModal,
	createHigherOrderComponent(
		( WrappedComponent ) => ( props ) => {
			return <WrappedComponent
				{ ...props }
				onCloseTicketEditor={ props.toggleTicketAssignments }
			/>;
		},
		'withOnCloseTicketEditor'
	),
	// withTicketPriceCalculatorFormModal,
] )( EditorTicketEntitiesList );

/**
 * a trimmed down ticket list: only includes ticket price calculator
 */
export const EditorTicketEntitiesOnlyList = compose( [
	// withEditorTicketEntities,
	// withTicketPriceCalculatorFormModal,
] )( EditorTicketEntitiesList );

/*
( () => (
		{
			title: __(
				'Ticket Assignments for All Event Dates',
				'event_espresso'
			),
			closeButtonLabel: null,
		}
	) )
*/
