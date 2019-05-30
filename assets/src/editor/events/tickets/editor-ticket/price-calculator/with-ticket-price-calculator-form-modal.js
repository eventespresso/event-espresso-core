/**
 * External imports
 */
import { compose, withState, createHigherOrderComponent } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { __, _x, sprintf } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/editor-hocs';
import { useState, useEffect, useCallback, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { withTicketPrices } from '../../data/with-ticket-prices';
import { withPriceTypes } from '../../data/with-price-types';
import useTicketPriceCalculatorFormDecorator from './use-ticket-price-calculator-form-decorator';
import {
	TicketPriceCalculatorForm,
	ticketPriceCalculatorFormDataMap,
} from './';

/**
 * TicketPriceCalculatorFormModal
 *
 * @constructor
 */
const TicketPriceCalculatorFormModal = withEditorModal( {
	title: __( 'Ticket Price Calculator', 'event_espresso' ),
	customClass: 'ee-ticket-price-calculator-modal',
	closeButtonLabel: __( 'close ticket price calculator',
		'event_espresso'
	),
} )( ( {
	ticket,
	prices,
	pricesLoaded,
	priceTypes,
	priceTypesLoaded,
	...extraProps
} ) => {
	const {
		decorator,
		calculateTicketPrices,
		setMutatorCallbacks,
		mutators,
	} = useTicketPriceCalculatorFormDecorator(
		priceTypes,
		priceTypesLoaded
	);
	const [ formData, setFormData ] = useState( {} );
	const [ reverseCalculate, setReverseCalculate ] = useState( false );

	useEffect( () => {
		const newFormData = ticketPriceCalculatorFormDataMap(
			ticket,
			prices,
			reverseCalculate
		);
		const totals = calculateTicketPrices( newFormData );
		setFormData( { ...newFormData, ...totals } );
	}, [ ticket, prices, reverseCalculate, calculateTicketPrices ] );

	const loading = ! ( pricesLoaded && priceTypesLoaded );
	const formProps = loading ?
		{ loading } :
		{
			loading,
			ticket,
			prices,
			priceTypes,
			formData,
		};

	return (
		<TicketPriceCalculatorForm
			{ ...formProps }
			decorators={ decorator }
			mutators={ mutators }
			setMutatorCallbacks={ setMutatorCallbacks }
			setReverseCalculate={ setReverseCalculate }
			loadHandler={ null }
			submitHandler={ null }
			resetHandler={ null }
			loadingNotice={
				sprintf(
					_x(
						'loading ticket prices%s',
						'loading ticket prices...',
						'event_espresso'
					),
					String.fromCharCode( '8230' )
				)
			}
			{ ...extraProps }
		/>
	);
} );

/*
 * Enhanced TicketPriceCalculatorForm with Modal
 * withSelectTicketPricesAndPriceTypes
 */
export default createHigherOrderComponent( compose( [
	withPriceTypes,
	withTicketPrices,
	withState( { formChanges: false } ),
	withDispatch( ( dispatch, ownProps ) => {
		const {
			setState,
			prices,
		} = ownProps;
		const {
			createEntity,
			createRelation,
			removeRelationForEntity,
			trashEntityById,
		} = dispatch( 'eventespresso/core' );
		const addPriceModifier = async ( ticket ) => {
			if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
				return;
			}
			const priceModifier = await createEntity(
				'price',
				{ PRC_order: prices.length + 1 }
			);
			if ( isModelEntityOfModel( priceModifier, 'price' ) ) {
				createRelation( 'ticket', ticket.id, 'price', priceModifier );
				setState( { formChanges: true } );
			}
		};
		const trashPriceModifier = async ( priceModifier, ticket ) => {
			if ( ! isModelEntityOfModel( priceModifier, 'price' ) ) {
				Error(
					__(
						'Unable to perform deletion because an invalid Price' +
						' Entity was supplied by the Ticket Price Calculator.',
						'event_espresso'
					)
				);
				return;
			}
			if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
				Error(
					__(
						'Unable to perform deletion because an invalid Ticket' +
						' Entity was supplied by the Ticket Price Calculator.',
						'event_espresso'
					)
				);
				return;
			}
			removeRelationForEntity(
				'ticket',
				ticket.id,
				'price',
				priceModifier.id
			);
			trashEntityById( 'price', priceModifier.id );
			setState( { formChanges: true } );
		};
		return { addPriceModifier, trashPriceModifier };
	} ),
	( WrappedComponent ) => ( props ) => {
		const [ showCalculator, setShowCalculator ] = useState( false );
		const toggleCalculator = useCallback( () => {
			setShowCalculator( ( prevShowCalculator ) => {
				return ! prevShowCalculator;
			} );
		} );
		return <Fragment>
			<WrappedComponent
				{ ...props }
				toggleCalculator={ toggleCalculator }
			/>
			<TicketPriceCalculatorFormModal
				{ ...props }
				editorOpen={ showCalculator }
				toggleEditor={ toggleCalculator }
			/>
		</Fragment>;
	},
] ), 'withTicketPriceCalculatorFormModal' );

