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
import { withPriceTypeEntities } from '../data/with-price-type-entities';
import { withTicketPriceCalculatorFormModal } from './price-calculator';
import { withEditTicketEntityFormModal } from './edit-form';
import { EditorTicketEntitiesGridView } from './grid-view/';
import { EditorTicketEntitiesListView } from './list-view/';
import { withPaginatedTicketEntitiesListWithFilterBar } from './filter-bar';
import { withTicketAssignmentsManagerModal } from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const EditorTicketEntitiesList = ( {
	entities,
	allDateEntities,
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
				allDateEntities={ allDateEntities }
				EntityGridView={ EditorTicketEntitiesGridView }
				EntityListView={ EditorTicketEntitiesListView }
				view={ view }
				noResultsText={
					__(
						'no results found (try changing filters)',
						'event_espresso'
					)
				}
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

export default compose( [
	withPriceTypeEntities,
	createHigherOrderComponent(
		( WrappedComponent ) => ( props ) => {
			const [ newTicket, setNewTicketEntity ] = useState( null );
			const basePriceTypeEntity = useMemo(
				() => {
					return find(
						props.priceTypeEntities,
						( priceType ) => priceType.pbtId === 1
					);
				},
				[ props.priceTypeEntities ]
			);
			return <WrappedComponent
				setNewTicketEntity={ setNewTicketEntity }
				ticketEntity={ newTicket }
				basePriceTypeEntity={ basePriceTypeEntity }
				{ ...props }
			/>;
		},
		'withNewTicket'
	),
	withTicketAssignmentsManagerModal( () => (
		{
			title: __(
				'Ticket Assignments for All Event Dates',
				'event_espresso'
			),
			closeButtonLabel: null,
		}
	) ),
	// add ticketAssignments ManagerModal onClose
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
	withEditTicketEntityFormModal,
	withDispatch(
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
					{ prtId: basePriceTypeEntity.id }
				);
				createRelations(
					'ticket',
					newTicket.id,
					'prices',
					[ newBasePrice ]
				);
				setNewTicketEntity( newTicket );
			};
			return { addNewTicketEntity };
		}
	),
	withPaginatedTicketEntitiesListWithFilterBar(),
] )( EditorTicketEntitiesList );
