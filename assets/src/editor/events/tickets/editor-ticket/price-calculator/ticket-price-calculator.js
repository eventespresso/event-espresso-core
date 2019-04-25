/**
 * External imports
 */
import { find, isArray, isEmpty, reverse, sortBy } from 'lodash';
import createDecorator from 'final-form-calculate';
import { select } from '@wordpress/data';
import { priceTypeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { SiteCurrency } from '@eventespresso/value-objects';

export const TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX = 'ee-ticket-price-calculator';

export const getPriceTypeObjects = () => select( 'eventespresso/lists' )
	.getEntities( 'price_type' );

const { BASE_PRICE_TYPES } = priceTypeModel;

/**
 * @function
 * @param {number|string} moneyValue
 * @return {number} money value
 */
export const parseMoneyValue = ( moneyValue ) => {
	moneyValue = moneyValue && moneyValue.toString ?
		moneyValue.toString().replace(
			SiteCurrency.thousandsSeparator,
			''
		).replace(
			SiteCurrency.sign,
			''
		) :
		0;
	moneyValue = parseFloat( moneyValue );
	return ! isNaN( moneyValue ) ? moneyValue : 0;
};

/**
 * @function
 * @param {Object} formData
 * @return {number|string} ticketID
 */
const getTicketId = ( formData ) => formData.ticketID ?
	formData.ticketID :
	0;

/**
 * @function
 * @param {Object} formData
 * @return {number} total
 */
const getTicketTotal = ( formData ) => {
	const total = formData.ticketTotal ?
		formData.ticketTotal :
		0;
	return parseMoneyValue( total );
};

/**
 * @function
 * @param {Object} formData
 * @return {Object} new field data
 */
const calculateTicketTotalFromModifiers = ( formData ) => {
	const ticketID = getTicketId( formData );
	if ( ! ticketID ) {
		return {};
	}
	const priceModifiers = getPriceModifierFormData( ticketID, formData );
	if ( ! isArray( priceModifiers ) || isEmpty( priceModifiers ) ) {
		return {};
	}
	const total = calculateTicketTotal( priceModifiers );
	return { ticketTotal: total.toFixed( SiteCurrency.decimalPlaces ) };
};

/**
 * @function
 * @param {number|string} ticketID
 * @param {Object} formData
 * @return {Array} price modifiers
 */
const getPriceModifierFormData = ( ticketID, formData ) => {
	const priceTypeObjects = getPriceTypeObjects();
	let basePrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	basePrefix += '-ticket-' + ticketID + '-price';
	const priceModifiers = [];
	const priceIDs = formData.priceIDs ? formData.priceIDs.split( ',' ) : [];
	for ( const priceID of priceIDs ) {
		const prefix = `${ basePrefix }-${ priceID }`;
		const priceType = typeof formData[ `${ prefix }-type` ] !== 'undefined' ?
			parseInt( formData[ `${ prefix }-type` ] ) :
			0;
		const priceAmount = typeof formData[ `${ prefix }-amount` ] !== 'undefined' ?
			parseMoneyValue( formData[ `${ prefix }-amount` ] ) :
			0;
		if ( priceAmount ) {
			const priceTypeObject = find(
				priceTypeObjects, [ 'PRT_ID', priceType ]
			);
			if (
				isModelEntityOfModel( priceTypeObject, 'price_type' )
			) {
				priceModifiers.push( {
					type: priceTypeObject,
					amount: priceAmount,
				} );
			}
		}
	}
	return priceModifiers;
};

/**
 * @function
 * @param {Array} priceModifiers
 * @return {number} total
 */
const calculateTicketTotal = ( priceModifiers ) => {
	let total = 0;
	priceModifiers = sortBy( priceModifiers, [ 'order', 'id' ] );
	priceModifiers.forEach( ( priceModifier ) => {
		const type = priceModifier.type;
		const amount = priceModifier.amount;
		if ( type.pbtId === BASE_PRICE_TYPES.BASE_PRICE ) {
			// Base Price
			total += amount;
		} else if ( type.pbtId === BASE_PRICE_TYPES.DISCOUNT ) {
			if ( type.isPercent ) {
				// Percent Discount
				total -= ( amount / 100 ) * total;
			} else {
				// Dollar Discount
				total -= amount;
			}
		} else if ( type.pbtId === BASE_PRICE_TYPES.SURCHARGE ) {
			if ( type.isPercent ) {
				// Percent Surcharge
				total += ( amount / 100 ) * total;
			} else {
				// Dollar Surcharge
				total += amount;
			}
		} else if ( type.pbtId === BASE_PRICE_TYPES.TAX ) {
			// any tax
			total += ( amount / 100 ) * total;
		}
	} );
	return parseMoneyValue( total );
};

/**
 * @function
 * @param {Object} formData
 * @return {Object} new field data
 */
const calculateTicketBasePriceFromTotal = ( formData ) => {
	const ticketID = getTicketId( formData );
	if ( ! ticketID ) {
		return {};
	}
	const basePriceFormFieldID = getBasePriceFormFieldID( ticketID, formData );
	if ( basePriceFormFieldID === '' ) {
		return {};
	}
	let basePrice = getTicketTotal( formData );
	const priceModifiers = getPriceModifierFormData( ticketID, formData );
	if ( isArray( priceModifiers ) && ! isEmpty( priceModifiers ) ) {
		basePrice = calculateTicketBasePrice( basePrice, priceModifiers );
	}
	return {
		[ basePriceFormFieldID ]: basePrice.toFixed(
			SiteCurrency.decimalPlaces
		),
	};
};

/**
 * @function
 * @param {number|string} ticketID
 * @param {Object} formData
 * @return {string} form field name
 */
const getBasePriceFormFieldID = ( ticketID, formData ) => {
	let basePrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	basePrefix += '-ticket-' + ticketID + '-price';
	if ( ! formData.priceIDs ) {
		return 'no-priceIDs-found';
	}
	const priceIDs = formData.priceIDs.split( ',' );
	for ( const priceID of priceIDs ) {
		const prefix = `${ basePrefix }-${ priceID }`;
		const priceType = typeof formData[ `${ prefix }-type` ] !== 'undefined' ?
			parseInt( formData[ `${ prefix }-type` ] ) :
			null;
		// base prices have a type id of 1
		if ( priceType === 1 ) {
			const basePrice = typeof formData[ `${ prefix }-amount` ] !== 'undefined' ?
				formData[ `${ prefix }-amount` ] :
				null;
			if ( basePrice !== null ) {
				return `${ prefix }-amount`;
			}
		}
	}
	return '';
};

/**
 * @function
 * @param {number} total
 * @param {Array} priceModifiers
 * @return {number} total
 */
export const calculateTicketBasePrice = ( total, priceModifiers ) => {
	priceModifiers = sortBy( priceModifiers, [ 'order', 'id' ] );
	priceModifiers = reverse( priceModifiers );
	priceModifiers.forEach( ( priceModifier ) => {
		const type = priceModifier.type;
		const amount = priceModifier.amount;
		// reverse engineer base price from total:
		// don't do anything with base prices
		// because that is what we are trying to calculate
		if ( type.pbtId === BASE_PRICE_TYPES.DISCOUNT ) {
			if ( type.isPercent ) {
				// Percent Discount
				total = total / ( ( 100 - amount ) / 100 );
			} else {
				// Dollar Discount
				total += amount;
			}
		} else if ( type.pbtId === BASE_PRICE_TYPES.SURCHARGE ) {
			if ( type.isPercent ) {
				// Percent Surcharge
				total = total / ( ( 100 + amount ) / 100 );
			} else {
				// Dollar Surcharge
				total -= amount;
			}
		} else if ( type.pbtId === BASE_PRICE_TYPES.TAX ) {
			// any tax
			total = total / ( ( 100 + amount ) / 100 );
		}
	} );
	return parseMoneyValue( total );
};

/**
 * @function
 * @param {Object} formData
 * @return {Object} priceChanges
 */
export const calculateTicketPrices = ( formData ) => {
	return formData.reverseCalculate ?
		calculateTicketBasePriceFromTotal( formData ) :
		calculateTicketTotalFromModifiers( formData );
};

let calculating = null;
const sleep = ( delay = 250 ) => {
	return delay ? new Promise(
		( resolve ) => setTimeout( resolve, delay )
	) : null;
};

/**
 * @function
 * @param {Object} formData
 * @param {number} delay
 * @return {Object} priceChanges
 */
const runTicketPriceCalculations = async ( formData, delay = 250 ) => {
	const now = new Date().getTime();
	calculating = now;
	const priceChanges = calculateTicketPrices( formData );
	await sleep( delay );
	// WHAT?!?!? Why are we sleeping????
	// because someone might type in multiple numbers quickly...
	// for example: 10
	// but React Final Form will trigger these decorators
	// the instant a change is detected and start processing the `1`
	// before you have a chance to enter the `0`, but pausing for
	// 250 ms allows enough time for subsequent key presses.
	// tracking a timestamp for when calculations start means
	// we can discard any that have been followed by other changes,
	// so we only keep changes from the very last key press
	return calculating === now ? priceChanges : {};
};

export const ticketPriceCalculator = createDecorator(
	{
		field: /^(.*?(\b-amount\b))$/,
		updates: async ( value, name, formData, prevData ) => {
			if ( parseFloat( formData[ name ] ) === parseFloat( prevData[ name ] ) ) {
				return {};
			}
			return await runTicketPriceCalculations( formData );
		},
	},
	{
		field: /^(.*?(\b-type\b))$/,
		updates: async ( value, name, formData, prevData ) => {
			if ( formData[ name ] === prevData[ name ] ) {
				return {};
			}
			return await runTicketPriceCalculations( formData );
		},
	},
	{
		field: 'ticketTotal',
		updates: async ( value, name, formData, prevData ) => {
			if ( parseFloat( formData[ name ] ) === parseFloat( prevData[ name ] ) ) {
				return {};
			}
			return await runTicketPriceCalculations( formData );
		},
	},
);
