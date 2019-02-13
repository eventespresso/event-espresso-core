/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { Component } from 'react';
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
// import { EspressoIcon } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/higher-order-components';

/**
 * Internal dependencies
 */
import { default as TicketPriceCalculatorForm } from './ticket-price-calculator-form';
import { ticketPriceCalculatorFormDataMap } from './ticket-price-calculator-form-data-map';
// import './style.css';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * TicketPriceCalculatorFormModal
 *
 * @constructor
 * @param {Object} ticket    JSON object defining the Ticket
 * @return {Object} rendered menu
 */
class TicketPriceCalculatorFormModal extends Component {
	/**
	 * @constructor
	 * @param {Object} props
	 */
	constructor( props ) {
		super( props );
		this.toggleEditor = props.closeModal;
		// this.state = {
		// 	ticket: props.ticket,
		// 	prices: props.prices,
		// 	// originalTicket: null,
		// };
	}

	// /**
	//  * @function
	//  * @param {number} ticketId
	//  * @return {Promise} ticket
	//  */
	// getTicket = ( ticketId ) => {
	// 	console.log( 'TicketPriceCalculatorFormModal.getTicket()' );
	// 	return new Promise(
	// 		( resolve ) => {
	// 			// resolve(
	// 			// 	select( 'eventespresso/core' )
	// 			// 		.getEntityById(
	// 			// 			'ticket',
	// 			// 			ticketId
	// 			// 		)
	// 			// );
	// 			if ( ticketId ) {
	// 				console.log(
	// 					'TicketPriceCalculatorFormModal.getTicket() ticketId',
	// 					ticketId
	// 				);
	// 				const ticket = select( 'eventespresso/core' )
	// 					.getEntityById(
	// 						'ticket',
	// 						ticketId
	// 					);
	// 				console.log(
	// 					'TicketPriceCalculatorFormModal.getTicket() ticket',
	// 					ticket
	// 				);
	// 				if ( ticket ) {
	// 					resolve( ticket );
	// 				}
	// 			}
	// 		}
	// 	);
	// };
	//
	// /**
	//  * @function
	//  * @param {Object} ticket
	//  * @return {Promise} prices
	//  */
	// getTicketPrices = ( ticket ) => {
	// 	console.log( 'TicketPriceCalculatorFormModal.getTicketPrices()' );
	// 	return new Promise(
	// 		( resolve ) => {
	// 			// resolve(
	// 			// 	select( `eventespresso/core` )
	// 			// 		.getRelatedEntities( ticket, 'price' )
	// 			// );
	// 			console.log(
	// 				'TicketPriceCalculatorFormModal.getTicketPrices() ticket',
	// 				ticket
	// 			);
	// 			const prices = isModelEntityOfModel( ticket, 'ticket' ) ?
	// 				select( 'eventespresso/core' )
	// 					.getRelatedEntities( ticket, 'prices' ) :
	// 				[];
	// 			console.log(
	// 				'TicketPriceCalculatorFormModal.getTicketPrices() prices',
	// 				prices
	// 			);
	// 			if ( prices !== [] ) {
	// 				resolve( {
	// 					ticket: ticket,
	// 					prices: prices,
	// 				} );
	// 			}
	// 		}
	// 	);
	// };

	/**
	 * @function
	 * @return {Object} data
	 */
	loadHandler = async () => {
		console.log( 'TicketPriceCalculatorFormModal.loadHandler()' );
		return {};
		// return {
		// 	ticket: this.props.ticket,
		// 	prices: this.props.prices,
		// };
		// if (
		// 	isModelEntityOfModel( this.props.ticket, 'ticket' ) &&
		// 	this.props.prices !== [] &&
		// 	this.props.priceTypes !== []
		// ) {
		// 	console.log( '************************************************' );
		// 	console.log(
		// 		'TicketPriceCalculatorFormModal.loadHandler()',
		// 		this.props.ticket,
		// 		this.props.prices,
		// 		this.props.priceTypes
		// 	);
		// 	console.log( '************************************************' );
		// 	return {
		// 		ticket: this.props.ticket,
		// 		prices: this.props.prices,
		// 		priceTypes: this.props.priceTypes,
		// 	};
		// }
		// return this.getTicket( this.props.ticketId )
		// 	.then( this.getTicketPrices )
		// 	.then( ( data ) => {
		// 		return data;
		// 	} );
		// const ticket = await this.getTicket( this.props.ticketId );
		// if ( ticket ) {
		// 	console.log(
		// 		'TicketPriceCalculatorFormModal.loadHandler() ticket',
		// 		ticket
		// 	);
		// 	const prices = await this.getTicketPrices( ticket );
		// 	if ( prices ) {
		// 		console.log(
		// 			'TicketPriceCalculatorFormModal.loadHandler() prices',
		// 			prices
		// 		);
		// 		return {
		// 			ticket: ticket,
		// 			prices: prices,
		// 		};
		// 	}
		// }
	};

	/**
	 * @function
	 * @param {Object} data
	 */
	submitHandler = async ( data ) => {
		console.log( 'TicketPriceCalculatorFormModal.submitHandler()' );
		console.log( ' >>> SUBMITTING DATA <<<', data );
		// const ticket = ticketEntityFormSubmitHandler(
		// 	this.state.ticket,
		// 	data
		// );
		// console.log( ' >>> UPDATED TICKET <<<', ticket );
		// this.setState( { ticket: ticket } );
		this.toggleEditor();
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	resetHandler = ( event ) => {
		console.log( 'TicketPriceCalculatorFormModal.resetHandler()' );
		console.log( ' >>> FORM RESET <<<', event );
		// this.setState( { ticket: this.state.originalTicket } );
	};

	render() {
		// console.log( '' );
		// console.log( 'TicketPriceCalculatorFormModal.render()', this.props );
		const {
			ticket,
			prices,
			priceTypes,
			...formProps
		} = this.props;
		const formDataMap = ticketPriceCalculatorFormDataMap(
			ticket,
			prices
		);
		// console.log( 'TicketPriceCalculatorFormModal.render() formDataMap',
		// 	formDataMap
		// );
		const formData = ! isEmpty( formDataMap ) && ! isEmpty( priceTypes ) ?
			{
				loading: false,
				formData: formDataMap,
				ticket,
				prices,
				priceTypes,
			} :
			{ loading: true };
		// console.log( 'TicketPriceCalculatorFormModal.render() formData', formData );

		return (
			<TicketPriceCalculatorForm
				// loadHandler={ this.loadHandler }
				{ ...formData }
				loadHandler={ null }
				submitHandler={ this.submitHandler }
				resetHandler={ this.resetHandler }
				{ ...formProps }
			/>
		);
	}
}

/**
 * Enhanced TicketPriceCalculatorForm with Modal
 */
export default withEditorModal( {
	title: __( 'Ticket Price Calculator', 'event_espresso' ),
	customClass: 'ee-ticket-price-calculator-modal',
	closeButtonLabel: __( 'close ticket price calculator', 'event_espresso' ),
} )(
	withSelect( ( select, ownProps ) => {
		const ticket = select( 'eventespresso/core' )
			.getTicketById( ownProps.ticketId );
		let prices = DEFAULT_EMPTY_ARRAY;
		if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
			prices = select( 'eventespresso/core' )
				.getRelatedEntities( ticket, 'prices' );
		}
		const priceTypes = select( 'eventespresso/lists' )
			.getEntities( 'price_type' );
		return ticket && ! isEmpty( prices ) && ! isEmpty( priceTypes ) ? {
			ticket,
			prices,
			priceTypes,
		} : {};
	} )( TicketPriceCalculatorFormModal )
);
