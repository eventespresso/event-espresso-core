/**
 * External imports
 */
import { find, reverse, sortBy, first, filter, isEmpty } from 'lodash';
import { priceTypeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { useCallback } from '@wordpress/element';
import { Money, SiteCurrency } from '@eventespresso/value-objects';
import memoize from 'memize';

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

const getBasePrice = memoize(
	( prices ) => find( prices, ( price ) => {
		return price.prtId === BASE_PRICE_TYPES.BASE_PRICE;
	} )
);

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

const useTicketPriceCalculators = ( priceTypes ) => {
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

	const calculateTicketBasePrice = useCallback( (
		total,
		prices,
		updateBasePrice = false
	) => {
		if ( isEmpty( prices ) ) {
			return;
		}
		prices = reverse( sortBy( prices, [ 'order', 'id' ] ) );
		const basePriceTotal = prices.reduce( ( newTotal, price ) => {
			const priceType = getPriceTypeForPrice( price, priceTypes );
			const amount = price.amount instanceof Money ?
				price.amount.toNumber() :
				price.amount;
			return accrueAmount( reverseCases(
				newTotal,
				amount,
				priceType.isPercent
			) )( newTotal )( priceType.pbtId );
		}, total );
		if ( updateBasePrice ) {
			const basePrice = getBasePrice( prices );
			basePrice.amount = new Money( basePriceTotal, SiteCurrency );
		}
		return basePriceTotal;
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
