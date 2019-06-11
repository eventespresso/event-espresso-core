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

const getPriceTypeForPrice = ( priceEntity, priceTypes ) => {
	const priceType = find( priceTypes, [ 'id', priceEntity.PRT_ID ] );
	if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
		return priceType;
	}
	return first( filter( priceTypes, ( pt ) => pt.id !== 1 ) );
};

const useTicketPriceCalculators = ( priceTypeEntities ) => {
	const calculateTicketTotal = useCallback( ( total = 0, priceEntities ) => {
		priceEntities = sortBy( priceEntities, [ 'order', 'id' ] );
		return priceEntities.reduce( ( newTotal, priceEntity ) => {
			const priceTypeEntity = getPriceTypeForPrice( priceEntity, priceTypeEntities );
			return accrueAmount( normalCases(
				newTotal,
				priceEntity.amount,
				priceTypeEntity.isPercent
			) )( newTotal )( priceTypeEntity.pbtId );
		}, total );
	}, [ priceTypeEntities ] );

	const calculateTicketBasePrice = useCallback( (
		total,
		priceEntities,
		updateBasePrice = false
	) => {
		if ( isEmpty( priceEntities ) ) {
			return;
		}
		priceEntities = reverse( sortBy( priceEntities, [ 'order', 'id' ] ) );
		const basePriceTotal = priceEntities.reduce( ( newTotal, priceEntity ) => {
			const priceTypeEntity = getPriceTypeForPrice( priceEntity, priceTypeEntities );
			const amount = priceEntity.amount instanceof Money ?
				priceEntity.amount.toNumber() :
				priceEntity.amount;
			return accrueAmount( reverseCases(
				newTotal,
				amount,
				priceTypeEntity.isPercent
			) )( newTotal )( priceTypeEntity.pbtId );
		}, total );
		if ( updateBasePrice ) {
			const basePrice = getBasePrice( priceEntities );
			basePrice.amount = new Money( basePriceTotal, SiteCurrency );
		}
		return basePriceTotal;
	}, [ priceTypeEntities ] );

	const calculateTicketTotals = useCallback( ( total, priceEntities, reverseCalculate ) => {
		return reverseCalculate ?
			calculateTicketBasePrice( total, priceEntities ) :
			calculateTicketTotal( total, priceEntities );
	} );

	return {
		calculateTicketBasePrice,
		calculateTicketTotal,
		calculateTicketTotals,
	};
};

export default useTicketPriceCalculators;
