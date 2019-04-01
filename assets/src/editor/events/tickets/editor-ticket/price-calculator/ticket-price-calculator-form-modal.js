/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { __, _x, sprintf } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/higher-order-components';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import { default as TicketPriceCalculatorForm } from './ticket-price-calculator-form';
import {
	ticketPriceCalculatorFormDataMap,
} from './ticket-price-calculator-form-data-map';
import { ticketPriceCalculator } from './ticket-price-calculator';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * TicketPriceCalculatorFormModal
 *
 * @constructor
 */
class TicketPriceCalculatorFormModal extends Component {
	/**
	 * @constructor
	 * @param {Object} props
	 */
	constructor( props ) {
		super( props );
		this.toggleEditor = props.closeModal;
	}

	/**
	 * @function
	 * @param {Object} data
	 */
	submitHandler = async ( data ) => {
		console.log( 'TicketPriceCalculatorFormModal.submitHandler()' );
		console.log( ' >>> SUBMITTING DATA <<<', data );
		this.toggleEditor();
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	resetHandler = ( event ) => {
		console.log( 'TicketPriceCalculatorFormModal.resetHandler()' );
		console.log( ' >>> FORM RESET <<<', event );
		this.toggleEditor();
	};

	render() {
		const {
			loading,
			ticket,
			prices,
			priceTypes,
			...formProps
		} = this.props;
		const formData = loading ?
			{ loading } :
			{
				loading,
				formData: ticketPriceCalculatorFormDataMap(
					ticket,
					prices
				),
				ticket,
				prices,
				priceTypes,
			};
		return (
			<TicketPriceCalculatorForm
				{ ...formData }
				decorators={ ticketPriceCalculator }
				loadHandler={ null }
				submitHandler={ this.submitHandler }
				resetHandler={ this.resetHandler }
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
				{ ...formProps }
			/>
		);
	}
}

/**
 * Enhanced TicketPriceCalculatorForm with Modal
 */
export default compose( [
	withEditorModal( {
		title: __( 'Ticket Price Calculator', 'event_espresso' ),
		customClass: 'ee-ticket-price-calculator-modal',
		closeButtonLabel: __( 'close ticket price calculator',
			'event_espresso'
		),
	} ),
	withSelect( ( select, ownProps ) => {
		const {
			getEntityById,
			getRelatedEntities,
		} = select( 'eventespresso/core' );
		const { getEntities } = select( 'eventespresso/lists' );
		const { hasFinishedResolution } = select( 'core/data' );
		const getTicket = async ( ticketId ) => {
			const ticket = getEntityById( 'ticket', parseInt( ticketId ) );
			if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
				return ticket;
			}
		};
		const ticket = ownProps.ticket;
		let prices = DEFAULT_EMPTY_ARRAY;
		if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
			prices = getRelatedEntities( ticket, 'prices' );
		}
		const priceTypes = getEntities( 'price_type' );
		const pricesResolved = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ ticket, 'prices' ]
		);
		const priceTypesResolved = hasFinishedResolution(
			'eventespresso/lists',
			'getEntities',
			[ 'price_type' ]
		);
		return pricesResolved && priceTypesResolved ? {
			loading: false,
			ticket,
			prices,
			priceTypes,
			getTicket,
		} : {
			loading: true,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const {
			createEntity,
			createRelation,
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
			}
		};
		const trashPriceModifier = async ( priceModifier ) => {
			if ( ! isModelEntityOfModel( priceModifier, 'price' ) ) {
				return;
			}
			trashEntityById( 'price', priceModifier.id );
		};
		return { addPriceModifier, trashPriceModifier };
	} ),
] )( TicketPriceCalculatorFormModal );
