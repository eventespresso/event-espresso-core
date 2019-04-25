/**
 * External imports
 */
import warning from 'warning';
import { Component } from '@wordpress/element';
import { compose, withState, withSafeTimeout } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { __, _x, sprintf } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/higher-order-components';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import {
	default as withSelectTicketPricesAndPriceTypes,
} from '../../data/with-select-ticket-prices-and-price-types';
import {
	default as TicketPriceCalculatorForm,
} from './ticket-price-calculator-form';
import {
	ticketPriceCalculatorFormDataMap,
} from './ticket-price-calculator-form-data-map';
import {
	calculateTicketPrices,
	ticketPriceCalculator,
} from './ticket-price-calculator';
import {
	ticketPriceCalculatorSubmitHandler,
} from './ticket-price-calculator-submit-handler';

/**
 * TicketPriceCalculatorFormModal
 *
 * @constructor
 */
class TicketPriceCalculatorFormModal extends Component {
	/**
	 * @function
	 * @param {Object} ticket
	 * @param {Array} prices
	 * @param {boolean} reverseCalculate
	 * @return {Object} formData
	 */
	loadHandler = ( ticket, prices, reverseCalculate ) => {
		const formData = ticketPriceCalculatorFormDataMap(
			ticket,
			prices,
			reverseCalculate
		);
		const totals = calculateTicketPrices( formData );
		return { ...formData, ...totals };
	};

	/**
	 * @function
	 * @param {Object} formData
	 */
	submitHandler = async ( formData ) => {
		const ticket = await ticketPriceCalculatorSubmitHandler(
			this.props.ticket,
			this.props.prices,
			formData
		);
		if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
			this.props.setState( { formChanges: false } );
			this.toggleEditor();
		}
		if ( Array.isArray( ticket ) ) {
			warning( false, ticket.join( '/n' ) );
		}
	};

	render() {
		const {
			loading,
			ticket,
			prices,
			priceTypes,
			reverseCalculate,
			closeModal,
			...extraProps
		} = this.props;
		this.toggleEditor = closeModal;
		const formProps = loading ?
			{ loading } :
			{
				loading,
				ticket,
				prices,
				priceTypes,
				formData: this.loadHandler( ticket, prices, reverseCalculate ),
			};
		return (
			<TicketPriceCalculatorForm
				{ ...formProps }
				decorators={ ticketPriceCalculator }
				loadHandler={ null }
				submitHandler={ this.submitHandler }
				resetHandler={ closeModal }
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
	}
}

/**
 * Enhanced TicketPriceCalculatorForm with Modal
 * withSelectTicketPricesAndPriceTypes
 */
export default compose( [
	withSafeTimeout,
	withState( {
		formChanges: false,
		reverseCalculate: false,
		newModifierUpdate: false,
		newModifiers: [],
		deletedModifiers: [],
	} ),
	withEditorModal( {
		title: __( 'Ticket Price Calculator', 'event_espresso' ),
		customClass: 'ee-ticket-price-calculator-modal',
		closeButtonLabel: __( 'close ticket price calculator',
			'event_espresso'
		),
	} ),
	withSelectTicketPricesAndPriceTypes,
	withDispatch( ( dispatch, ownProps ) => {
		const { newModifiers, deletedModifiers } = ownProps;
		const {
			createEntity,
			createRelation,
			removeRelationForEntity,
			trashEntityById,
		} = dispatch( 'eventespresso/core' );
		const addPriceModifier = async ( ticket, details = {} ) => {
			if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
				return;
			}
			const priceModifier = await createEntity(
				'price',
				{
					PRT_ID: parseInt( details.type || 2 ),
					PRC_name: details.name || '',
					PRC_desc: details.desc || '',
					PRC_amount: new Money(
						parseFloat( details.amount || 0 ), SiteCurrency
					),
					PRC_order: details.order || 999,
				}
			);
			if ( isModelEntityOfModel( priceModifier, 'price' ) ) {
				createRelation( 'ticket', ticket.id, 'price', priceModifier );
				newModifiers.push( priceModifier.id );
				ownProps.setState( { formChanges: true } );
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
			deletedModifiers.push( priceModifier.id );
			ownProps.setState( { formChanges: true } );
		};
		return { addPriceModifier, trashPriceModifier };
	} ),
] )( TicketPriceCalculatorFormModal );
