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
import { withPriceTypes } from '../data/with-price-types';
import { withTicketPriceCalculatorFormModal } from './price-calculator';
import { withEditTicketFormModal } from './edit-form';
import { EditorTicketsGridView } from './grid-view/';
import { EditorTicketsListView } from './list-view/';
import PaginatedTicketsListWithFilterBar from './filter-bar';
import { withTicketAssignmentsManagerModal } from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

const EditorTicketsList = ( {
	entities,
	allDates,
	addNewTicket,
	toggleTicketEditor,
	ticket = null,
	view = 'grid',
	...otherProps
} ) => {
	useEffect( () => {
		if ( ticket !== null ) {
			toggleTicketEditor();
		}
	}, [ ticket ] );
	/**
	 * @function
	 * @return {Object} rendered button
	 */
	const addNewTicketButton = useMemo(
		() => {
			return (
				<EspressoButton
					icon="tickets-alt"
					buttonText={ __( 'Add New Ticket', 'event_espresso' ) }
					onClick={ addNewTicket }
				/>
			);
		},
		[ addNewTicket ]
	);

	return (
		<FormWrapper>
			<EntityList
				{ ...otherProps }
				entities={ entities }
				allDates={ allDates }
				EntityGridView={ EditorTicketsGridView }
				EntityListView={ EditorTicketsListView }
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
			<FormSaveCancelButtons submitButton={ addNewTicketButton } />
		</FormWrapper>
	);
};

export default compose( [
	withPriceTypes,
	createHigherOrderComponent(
		( WrappedComponent ) => ( props ) => {
			const [ newTicket, setNewTicket ] = useState( null );
			const basePriceType = useMemo(
				() => {
					return find(
						props.priceTypes,
						( priceType ) => priceType.pbtId === 1
					);
				},
				[ props.priceTypes ]
			);
			return <WrappedComponent
				setNewTicket={ setNewTicket }
				ticket={ newTicket }
				basePriceType={ basePriceType }
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
	withEditTicketFormModal,
	withDispatch(
		( dispatch, { setNewTicket, basePriceType } ) => {
			const { createEntity, createRelations } = dispatch( 'eventespresso/core' );
			const addNewTicket = async () => {
				const newTicket = await createEntity( 'ticket', {} );
				const newBasePrice = await createEntity(
					'price',
					{ prtId: basePriceType.id }
				);
				createRelations(
					'ticket',
					newTicket.id,
					'prices',
					[ newBasePrice ]
				);
				setNewTicket( newTicket );
			};
			return { addNewTicket };
		}
	),
	PaginatedTicketsListWithFilterBar,
] )( EditorTicketsList );
