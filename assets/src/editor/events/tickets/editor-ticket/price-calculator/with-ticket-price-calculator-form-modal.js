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
import { withTicketPriceEntities, withPriceTypeEntities } from '../../../hocs';
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
	ticketEntity,
	priceEntities,
	priceEntitiesLoaded,
	priceTypeEntities,
	priceTypeEntitiesLoaded,
	...extraProps
} ) => {
	const {
		decorator,
		calculateTicketPrices,
		setMutatorCallbacks,
		mutators,
	} = useTicketPriceCalculatorFormDecorator(
		priceTypeEntities,
		priceTypeEntitiesLoaded
	);
	const [ formData, setFormData ] = useState( {} );
	const [ reverseCalculate, setReverseCalculate ] = useState( false );

	useEffect( () => {
		const newFormData = ticketPriceCalculatorFormDataMap(
			ticketEntity,
			priceEntities,
			reverseCalculate
		);
		const totals = calculateTicketPrices( newFormData );
		setFormData( { ...newFormData, ...totals } );
	}, [ ticketEntity, priceEntities, reverseCalculate, calculateTicketPrices ] );

	const loading = ! ( priceEntitiesLoaded && priceTypeEntitiesLoaded );
	const formProps = loading ?
		{ loading } :
		{
			loading,
			ticketEntity,
			priceEntities,
			priceTypeEntities,
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
	withPriceTypeEntities,
	withTicketPriceEntities,
	withState( { formChanges: false } ),
	withDispatch( ( dispatch, ownProps ) => {
		const {
			setState,
			priceEntities,
		} = ownProps;
		const {
			createEntity,
			createRelation,
			removeRelationForEntity,
			trashEntityById,
		} = dispatch( 'eventespresso/core' );
		const addPriceModifier = async ( ticketEntity ) => {
			if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
				return;
			}
			const priceModifier = await createEntity(
				'price',
				{ PRC_order: priceEntities.length + 1 }
			);
			if ( isModelEntityOfModel( priceModifier, 'price' ) ) {
				createRelation( 'ticket', ticketEntity.id, 'price', priceModifier );
				setState( { formChanges: true } );
			}
		};
		const trashPriceModifier = async ( priceModifier, ticketEntity ) => {
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
			if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
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
				ticketEntity.id,
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

