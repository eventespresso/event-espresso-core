/**
 * External imports
 */
import { find, reverse, sortBy, first, filter } from 'lodash';
import { priceTypeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { useCallback } from '@wordpress/element';

const { BASE_PRICE_TYPES } = priceTypeModel;

const normalCases = ( currentTotal, amount, isPercent ) => ( {
	[ BASE_PRICE_TYPES.BASE_PRICE ]: () => currentTotal + amount,
	[ BASE_PRICE_TYPES.DISCOUNT ]: () => isPercent ?
		currentTotal - ( ( amount / 100 ) * currentTotal ) :
		currentTotal - amount,
	[ BASE_PRICE_TYPES.SURCHARGE ]: () => isPercent ?
		currentTotal + ( ( amount / 100 ) * currentTotal ) :
		currentTotal + amount,
	[ BASE_PRICE_TYPES.TAX ]: () =>
		currentTotal + ( ( amount / 100 ) * currentTotal ),
} );

const reverseCases = ( currentTotal, amount, isPercent ) => ( {
	[ BASE_PRICE_TYPES.DISCOUNT ]: () => isPercent ?
		currentTotal / ( ( 100 - amount ) / 100 ) :
		currentTotal + amount,
	[ BASE_PRICE_TYPES.SURCHARGE ]: () => isPercent ?
		currentTotal / ( ( 100 + amount ) / 100 ) :
		currentTotal - amount,
	[ BASE_PRICE_TYPES.TAX ]: () => currentTotal / ( ( 100 + amount ) / 100 ),
} );

const accrueAmount = ( cases ) => ( defaultCase ) => ( typeId ) =>
	cases.hasOwnProperty( typeId ) ?
		cases[ typeId ]() :
		defaultCase;

const getPriceTypeForPrice = ( price, priceTypes ) => {
	const priceType = find( priceTypes, [ 'id', price.PRT_ID ] );
	if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
		return priceType;
	}
	return first( filter( priceTypes, ( pt ) => pt.id !== 1 ) );
};

const useTicketPriceCalculators = ( priceTypes, priceTypesLoaded ) => {
	if ( ! priceTypesLoaded ) {
		return {
			calculateTicketTotal: () => 0,
			calculateTicketBasePrice: () => 0,
		};
	}
	const calculateTicketTotal = useCallback( ( total = 0, prices ) => {
		prices = sortBy( prices, [ 'order', 'id' ] );
		return prices.reduce( ( newTotal, price ) => {
			const priceType = getPriceTypeForPrice( price, priceTypes );
			return accrueAmount( normalCases(
				newTotal,
				price.amount,
				priceType.isPercent
			) )( newTotal )( priceType.pbtId );
		}, total );
	}, [ priceTypes ] );

	const calculateTicketBasePrice = useCallback( ( total, prices ) => {
		prices = reverse( sortBy( prices, [ 'order', 'id' ] ) );
		return prices.reduce( ( newTotal, price ) => {
			const priceType = getPriceTypeForPrice( price, priceTypes );
			return accrueAmount( reverseCases(
				newTotal,
				price.amount,
				priceType.isPercent
			) )( newTotal )( priceType.pbtId );
		}, total );
	}, [ priceTypes ] );

	const calculateTicketTotals = useCallback( ( total, prices, reverseCalculate ) => {
		return reverseCalculate ?
			calculateTicketBasePrice( total, prices ) :
			calculateTicketTotal( total, prices );
	} );

	return {
		calculateTicketBasePrice,
		calculateTicketTotal,
		calculateTicketTotals,
	};
};

export default useTicketPriceCalculators;
