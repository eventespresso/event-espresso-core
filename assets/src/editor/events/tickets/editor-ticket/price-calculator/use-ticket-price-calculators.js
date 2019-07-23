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

const getPriceAmount = ( priceEntity ) => priceEntity.amount instanceof Money ?
	priceEntity.amount.toNumber() :
	parseFloat( priceEntity.amount );

const ticketTotalCalculations = ( currentTotal, amount, isPercent ) => ( {
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

const basePriceCalculations = ( currentTotal, amount, isPercent ) => ( {
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

const accrueAmount = ( calculations ) => ( newTotal ) => ( basePriceType ) =>
	calculations.hasOwnProperty( basePriceType ) ?
		calculations[ basePriceType ]() :
		newTotal;

const getPriceTypeForPrice = ( priceEntity, priceTypeEntities ) => {
	const priceType = find( priceTypeEntities, [ 'id', priceEntity.PRT_ID ] );
	if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
		return priceType;
	}
	return first( filter( priceTypeEntities, ( pt ) => pt.id !== 1 ) );
};

const useTicketPriceCalculators = ( priceTypeEntities ) => {
	const calculateTicketTotal = useCallback(
		( total = 0, priceEntities ) => {
			priceEntities = sortBy( priceEntities, [ 'order', 'id' ] );
			return priceEntities.reduce(
				( newTotal, priceEntity ) => {
					const priceTypeEntity = getPriceTypeForPrice(
						priceEntity,
						priceTypeEntities
					);
					return accrueAmount(
						ticketTotalCalculations(
							newTotal,
							getPriceAmount( priceEntity ),
							priceTypeEntity.isPercent
						)
					)( newTotal )( priceTypeEntity.pbtId );
				},
				total
			);
		},
		[ priceTypeEntities ]
	);

	const calculateTicketBasePrice = useCallback(
		(
			total,
			priceEntities,
			updateBasePrice = false
		) => {
			if ( isEmpty( priceEntities ) ) {
				return;
			}
			priceEntities = reverse( sortBy( priceEntities, [ 'order', 'id' ] ) );
			const basePriceTotal = priceEntities.reduce(
				( newTotal, priceEntity ) => {
					const priceTypeEntity = getPriceTypeForPrice(
						priceEntity,
						priceTypeEntities
					);
					return accrueAmount(
						basePriceCalculations(
							newTotal,
							getPriceAmount( priceEntity ),
							priceTypeEntity.isPercent
						)
					)( newTotal )( priceTypeEntity.pbtId );
				},
				total
			);
			if ( updateBasePrice ) {
				const basePrice = getBasePrice( priceEntities );
				basePrice.amount = new Money( basePriceTotal, SiteCurrency );
			}
			return basePriceTotal;
		},
		[ priceTypeEntities ]
	);

	const calculateTicketTotals = useCallback(
		( total, priceEntities, reverseCalculate ) => {
			return reverseCalculate ?
				calculateTicketBasePrice( total, priceEntities ) :
				calculateTicketTotal( total, priceEntities );
		},
		[ calculateTicketBasePrice, calculateTicketTotal ]
	);

	return {
		calculateTicketBasePrice,
		calculateTicketTotal,
		calculateTicketTotals,
	};
};

export default useTicketPriceCalculators;
