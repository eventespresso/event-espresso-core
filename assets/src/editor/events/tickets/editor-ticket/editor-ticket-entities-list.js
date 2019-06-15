/**
 * External dependencies
 */
import { find } from 'lodash';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { useState, useMemo, useEffect } from '@wordpress/element';
import {
	EntityList,
	EspressoButton,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { withPriceTypeEntities, withEditorTicketEntities } from '../../hocs';
import { withTicketPriceCalculatorFormModal } from './price-calculator';
import { withTicketEntityFormModal } from './edit-form';
import { EditorTicketEntitiesGridView } from './grid-view/';
import { EditorTicketEntitiesListView } from './list-view/';
import { withPaginatedTicketEntitiesListAndFilterBarAndState } from './filter-bar';
import { withTicketAssignmentsManagerModal } from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const EditorTicketEntitiesList = ( {
	entities,
	addNewTicketEntity,
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
	/**
	 * @function
	 * @return {Object} rendered button
	 */
	const addNewTicketEntityButton = useMemo(
		() => {
			return (
				<EspressoButton
					icon="tickets-alt"
					buttonText={ __( 'Add New Ticket', 'event_espresso' ) }
					onClick={ addNewTicketEntity }
				/>
			);
		},
		[ addNewTicketEntity ]
	);

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
			<FormSaveCancelButtons submitButton={ addNewTicketEntityButton } />
		</FormWrapper>
	);
};

const withNewTicketEntity = createHigherOrderComponent(
	( WrappedComponent ) => ( props ) => {
		const [ newTicket, setNewTicketEntity ] = useState( null );
		const basePriceTypeEntity = useMemo(
			() => {
				if ( ! props.priceTypeEntitiesLoaded ) {
					return null;
				}
				return find(
					props.priceTypeEntities,
					( priceType ) => priceType.pbtId === 1
				);
			},
			[ props.priceTypeEntities, props.priceTypeEntitiesLoaded ]
		);
		return <WrappedComponent
			setNewTicketEntity={ setNewTicketEntity }
			ticketEntity={ newTicket }
			basePriceTypeEntity={ basePriceTypeEntity }
			{ ...props }
		/>;
	},
	'withNewTicket'
);

const createNewTicketEntity = withDispatch(
	( dispatch, { setNewTicketEntity, basePriceTypeEntity } ) => {
		const { createEntity, createRelations } = dispatch( 'eventespresso/core' );
		const addNewTicketEntity = async ( event ) => {
			if ( event && event.preventDefault ) {
				event.preventDefault();
				event.stopPropagation();
			}
			const newTicket = await createEntity( 'ticket', {} );
			const newBasePrice = await createEntity(
				'price',
				{ PRT_ID: basePriceTypeEntity.id }
			);
			createRelations(
				'ticket',
				newTicket.id,
				'price',
				[ newBasePrice ]
			);
			setNewTicketEntity( newTicket );
		};
		return { addNewTicketEntity };
	}
);

export default compose( [
	withPriceTypeEntities,
	withNewTicketEntity,
	withEditorTicketEntities,
	withPaginatedTicketEntitiesListAndFilterBarAndState(),
	// add ticketAssignments ManagerModal onClose
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
				onCloseTicketEditor={ props.toggleTicketAssignments }
			/>;
		},
		'withOnCloseTicketEditor'
	),
	withTicketPriceCalculatorFormModal,
	withTicketEntityFormModal,
	createNewTicketEntity,
] )( EditorTicketEntitiesList );

/**
 * a trimmed down ticket list: only includes ticket price calculator
 */
export const EditorTicketEntitiesOnlyList = compose( [
	withPriceTypeEntities,
	withNewTicketEntity,
	withEditorTicketEntities,
	withTicketPriceCalculatorFormModal,
	withTicketEntityFormModal,
	createNewTicketEntity,
] )( EditorTicketEntitiesList );
