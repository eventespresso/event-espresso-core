/**
 * External imports
 */
import { isArray, isEmpty, forEach } from 'lodash';
import { priceTypeModel } from '@eventespresso/model';
import { SiteCurrency } from '@eventespresso/value-objects';
import { useState, useEffect, useCallback, useMemo } from '@wordpress/element';
import createDecorator from 'final-form-calculate';
import { useDebounce } from '@eventespresso/hooks';

/**
 * Internal imports
 */
import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from './constants';
import useTicketPriceCalculators from './use-ticket-price-calculators';

const { BASE_PRICE_TYPES } = priceTypeModel;
const DEFAULT_OBJECT = {};

/**
 * @function
 * @param {number|string} moneyValue
 * @return {number} money value
 */
export const parseMoneyValue = ( moneyValue ) => {
	moneyValue = moneyValue && moneyValue.toString ?
		moneyValue.toString().replace(
			new RegExp( SiteCurrency.thousandsSeparator, 'g' ),
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
 * @return {number|string} ticketId
 */
const getTicketId = ( formData ) => formData.ticketID || 0;

/**
 * @function
 * @param {Object} formData
 * @return {number} total
 */
const getTicketTotal = ( formData ) => {
	const total = formData.ticketTotal || 0;
	return parseMoneyValue( total );
};

/**
 * @function
 * @param {Object} formData
 * @param {function} calculator  A calculator for calculating the total.
 * @return {Object} new field data
 */
const calculateTicketTotalFromModifiers = ( formData, calculator ) => {
	const ticketId = getTicketId( formData );
	if ( ! ticketId || typeof calculator !== 'function' ) {
		return DEFAULT_OBJECT;
	}
	const priceModifiers = getPriceModifiersFromFormData( ticketId, formData );
	if ( ! isArray( priceModifiers ) || isEmpty( priceModifiers ) ) {
		return DEFAULT_OBJECT;
	}
	const total = calculator( 0, priceModifiers );
	return { ticketTotal: total.toFixed( SiteCurrency.decimalPlaces ) };
};

/**
 * @function
 * @param {number|string} ticketId
 * @param {Object} formData
 * @return {string} form field name
 */
const getBasePriceFormFieldID = ( ticketId, formData ) => {
	const basePrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX +
		`-ticket-${ ticketId }-price`;
	if ( ! formData.priceIDs ) {
		return '';
	}
	const priceIDs = formData.priceIDs.split( ',' );
	for ( const priceID of priceIDs ) {
		const prefix = `${ basePrefix }-${ priceID }`;
		const priceTypeId = typeof formData[ `${ prefix }-type` ] !== 'undefined' ?
			parseInt( formData[ `${ prefix }-type` ], 10 ) :
			null;
		// base prices have a type id of 1
		if ( priceTypeId === BASE_PRICE_TYPES.BASE_PRICE ) {
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
 * @param {Object} formData
 * @param {function} calculator  A calculator for calculating the total.
 * @return {Object} new field data
 */
const calculateTicketBasePriceFromTotal = ( formData, calculator ) => {
	const ticketId = getTicketId( formData );
	if ( ! ticketId || typeof calculator !== 'function' ) {
		return DEFAULT_OBJECT;
	}
	const basePriceFormFieldID = getBasePriceFormFieldID( ticketId, formData );
	if ( basePriceFormFieldID === '' ) {
		return DEFAULT_OBJECT;
	}
	let basePrice = getTicketTotal( formData );
	const priceModifiers = getPriceModifiersFromFormData( ticketId, formData );
	if ( isArray( priceModifiers ) && ! isEmpty( priceModifiers ) ) {
		basePrice = calculator(
			basePrice,
			priceModifiers
		);
	}
	return {
		[ basePriceFormFieldID ]: basePrice.toFixed(
			SiteCurrency.decimalPlaces
		),
	};
};

/**
 * @function
 * @param {number|string} ticketId
 * @param {Object} formData
 * @return {Array} price modifiers
 */
const getPriceModifiersFromFormData = ( ticketId, formData ) => {
	let basePrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	basePrefix += '-ticket-' + ticketId + '-price';
	const priceModifiers = [];
	const priceIDs = formData.priceIDs ? formData.priceIDs.split( ',' ) : [];
	for ( const priceID of priceIDs ) {
		const prefix = `${ basePrefix }-${ priceID }`;
		const priceTypeId = typeof formData[ `${ prefix }-type` ] !== 'undefined' ?
			parseInt( formData[ `${ prefix }-type` ], 10 ) :
			0;
		const priceAmount = typeof formData[ `${ prefix }-amount` ] !== 'undefined' ?
			parseMoneyValue( formData[ `${ prefix }-amount` ] ) :
			0;
		if ( priceAmount ) {
			// @todo the calculators (exposed by useTicketPriceCalculators) sort by order and id
			// but the original code here never exposed those values to the calculations.
			// so it looks like it was a bit unfinished which means what we want to do here
			// is return the actual price objects for the calculators to do.
			// we'll probably have to expose the price objects through the hooks because they
			// are available!
			priceModifiers.push( {
				PRT_ID: priceTypeId,
				amount: priceAmount,
			} );
		}
	}
	return priceModifiers;
};

/**
 * A hook returning a form decorator used for updating total calculations in a
 * ticket price calculator form.
 *
 * @param {BaseEntity[]} priceTypeEntities  An array of price type BaseEntity objects
 * @param {number}  delay  A delay to use for debouncing the calculated total.
 * @return {Object}  decorator, mutators, and callbacks for react-final-form
 */
const useTicketPriceCalculatorFormDecorator = ( priceTypeEntities, delay = 250 ) => {
	const {
		calculateTicketTotal,
		calculateTicketBasePrice,
	} = useTicketPriceCalculators( priceTypeEntities );
	const [ totalChangedTo, setTotalChangingTo ] = useState( null );
	const [ mutatorCallbacks, setMutatorCallbacks ] = useState( null );
	const debouncedTotalChangedTo = useDebounce( totalChangedTo, delay );

	useEffect( () => {
		if ( debouncedTotalChangedTo ) {
			if ( mutatorCallbacks.totalMutator ) {
				mutatorCallbacks.totalMutator( debouncedTotalChangedTo );
			}
		}
	}, [ debouncedTotalChangedTo ] );

	const totalMutator = useCallback( (
		[ newTotal ],
		state,
		{ changeValue }
	) => {
		if ( newTotal ) {
			forEach( newTotal, ( value, field ) => {
				changeValue( state, field, () => value );
			} );
		}
	}, [] );

	const decorator = useMemo( () => {
		return createDecorator(
			{
				field: /^(.*?(\b-amount\b))$/,
				updates: ( value, name, formData, prevData ) => {
					if ( parseFloat( formData[ name ] ) === parseFloat( prevData[ name ] ) ) {
						return DEFAULT_OBJECT;
					}
					calculateTicketPrices( formData );
					return DEFAULT_OBJECT;
				},
			},
			{
				field: /^(.*?(\b-type\b))$/,
				updates: ( value, name, formData, prevData ) => {
					if ( formData[ name ] === prevData[ name ] ) {
						return DEFAULT_OBJECT;
					}
					calculateTicketPrices( formData );
					return DEFAULT_OBJECT;
				},
			},
			{
				field: 'ticketTotal',
				updates: ( value, name, formData, prevData ) => {
					if ( parseFloat( formData[ name ] ) === parseFloat( prevData[ name ] ) ) {
						return DEFAULT_OBJECT;
					}
					calculateTicketPrices( formData );
					return DEFAULT_OBJECT;
				},
			},
		);
	}, [] );

	const calculateTicketPrices = useCallback( ( formData ) => {
		const formTotal = formData.reverseCalculate ?
			calculateTicketBasePriceFromTotal(
				formData,
				calculateTicketBasePrice
			) :
			calculateTicketTotalFromModifiers(
				formData,
				calculateTicketTotal
			);
		setTotalChangingTo( formTotal );
	}, [ calculateTicketBasePrice, calculateTicketTotal ] );

	return {
		decorator,
		mutators: { totalMutator },
		calculateTicketPrices,
		setMutatorCallbacks,
	};
};

export default useTicketPriceCalculatorFormDecorator;
