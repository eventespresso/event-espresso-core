/**
 * External imports
 */
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
// import './style.css';

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
	// 			if ( prices ) {
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
		if (
			isModelEntityOfModel( this.props.ticket, 'ticket' ) &&
			Array.isArray( this.props.prices )
		) {
			return {
				ticket: this.props.ticket,
				prices: this.props.prices,
			};
		}
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
		console.log( 'TicketPriceCalculatorFormModal.render()', this.props );
		return (
			<TicketPriceCalculatorForm
				loadHandler={ this.loadHandler }
				submitHandler={ this.submitHandler }
				resetHandler={ this.resetHandler }
				{ ...this.props }
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
		const prices = isModelEntityOfModel( ticket, 'ticket' ) ?
			select( 'eventespresso/core' )
				.getRelatedEntities( ticket, 'prices' ) :
			[];
		return {
			ticket,
			prices,
		};
	} )( TicketPriceCalculatorFormModal )
);
