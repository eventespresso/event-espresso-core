/**
 * External imports
 */
import { filter, first, sortBy } from 'lodash';
import { dateTimeModel } from '@eventespresso/model';
import { DateTime } from '@eventespresso/value-objects';

/**
 * filterDateEntities
 * reduces dateEntities array based on value of the "showDates" filter
 *
 * @param {Array} dateEntities    original dateEntities array
 * @param {string} showDates    value for the "showDates" filter
 * @return {Array}         filtered dateEntities array
 */
export const filterDateEntities = ( dateEntities, showDates = 'active-upcoming' ) => {
	dateEntities = sortDateEntitiesList( dateEntities );
	switch ( showDates ) {
		case 'all' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return ! dateTimeModel.isTrashed( dateEntity );
				}
			);
		case 'active-upcoming' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return dateTimeModel.isActive( dateEntity ) ||
						dateTimeModel.isUpcoming( dateEntity );
				}
			);
		case 'active-only' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return dateTimeModel.isActive( dateEntity );
				}
			);
		case 'upcoming-only' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return dateTimeModel.isUpcoming( dateEntity );
				}
			);
		case 'next-active-upcoming-only' :
			dateEntities = filterDateEntities( dateEntities );
			return [ first( dateEntities ) ];
		case 'sold-out-only' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return ! dateTimeModel.isTrashed( dateEntity ) && ( (
						validStatus( dateEntity ) &&
						dateTimeModel.isSoldOut( dateEntity )
					) || capacityAtOrAbove( dateEntity, 100 ) );
				}
			);
		case 'above-90-capacity' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return ! dateTimeModel.isTrashed( dateEntity ) &&
						capacityAtOrAbove( dateEntity, 90 );
				}
			);
		case 'above-75-capacity' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return ! dateTimeModel.isTrashed( dateEntity ) &&
						capacityAtOrAbove( dateEntity, 75 );
				}
			);
		case 'above-50-capacity' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return ! dateTimeModel.isTrashed( dateEntity ) &&
						capacityAtOrAbove( dateEntity, 50 );
				}
			);
		case 'below-50-capacity' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return ! dateTimeModel.isTrashed( dateEntity ) &&
						capacityBelow( dateEntity, 50 );
				}
			);
		case 'recently-expired-only' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return dateTimeModel.isRecentlyExpired( dateEntity ) &&
						! dateTimeModel.isTrashed( dateEntity );
				}
			);
		case 'expired-only' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return dateTimeModel.isExpired( dateEntity ) &&
						! dateTimeModel.isTrashed( dateEntity );
				}
			);
		case 'trashed-only' :
			return filter(
				dateEntities,
				function( dateEntity ) {
					return dateTimeModel.isTrashed( dateEntity );
				}
			);
	}
	return dateEntities;
};

/**
 * sortDateEntitiesList
 * reduces dateEntities array based on value of the "datesSortedBy" filter
 *
 * @param {Array} dateEntities    original dateEntities array
 * @param {string} sort   value for the "datesSortedBy" filter
 * @return {Array}         filtered dateEntities array
 */
export const sortDateEntitiesList = ( dateEntities, sort = 'chronologically' ) => {
	dateEntities = dateEntities || [];
	switch ( sort ) {
		case 'chronologically' :
			dateEntities = sortBy(
				dateEntities,
				[
					function( dateEntity ) {
						return DateTime.isValid( dateEntity.start ) ?
							dateEntity.start.toMillis() :
							0;
					},
					'name',
					'id',
				]
			);
			break;
		case 'by-name' :
			dateEntities = sortBy( dateEntities, [ 'name' ] );
			break;
		case 'by-id' :
			dateEntities = sortBy( dateEntities, [ 'id' ] );
			break;
		case 'by-order' :
			dateEntities = sortBy( dateEntities, [ 'order' ] );
			break;
	}
	return dateEntities;
};

/**
 * @param {Object} dateEntity    event dateEntity object
 * @param {number} capacity
 * @return {boolean} true if sold/regLimit >= capacity
 */
const capacityAtOrAbove = ( dateEntity, capacity ) => {
	return validSold( dateEntity ) &&
		validFiniteReglimit( dateEntity ) &&
		(
			parseInt( dateEntity.sold, 10 ) /
			parseInt( dateEntity.regLimit, 10 ) >= ( capacity / 100 )
		);
};

/**
 * @param {Object} dateEntity    event dateEntity object
 * @param {number} capacity
 * @return {boolean} true if sold/regLimit less than than capacity
 */
const capacityBelow = ( dateEntity, capacity ) => {
	return (
		validInfiniteReglimit( dateEntity )
	) || (
		validSold( dateEntity ) &&
		validFiniteReglimit( dateEntity ) &&
		(
			parseInt( dateEntity.sold, 10 ) /
			parseInt( dateEntity.regLimit, 10 ) < ( capacity / 100 )
		)
	);
};

/**
 * @param {Object} dateEntity    event dateEntity object
 * @return {boolean} true if regLimit property is valid
 */
const validStatus = ( dateEntity ) => {
	return typeof dateEntity.status === 'string';
};

/**
 * @param {Object} dateEntity    event dateEntity object
 * @return {boolean} true if regLimit property is valid
 */
const validReglimit = ( dateEntity ) => {
	return typeof dateEntity.regLimit === 'string' ||
		typeof dateEntity.regLimit === 'number';
};

/**
 * @param {Object} dateEntity    event dateEntity object
 * @return {boolean} true if regLimit property is valid and NOT infinite
 */
const validFiniteReglimit = ( dateEntity ) => {
	return validReglimit( dateEntity ) &&
		dateEntity.regLimit !== 'INF' &&
		dateEntity.regLimit !== Infinity;
};

/**
 * @param {Object} dateEntity    event dateEntity object
 * @return {boolean} true if regLimit property is valid and unlimited
 */
const validInfiniteReglimit = ( dateEntity ) => {
	return validReglimit( dateEntity ) && (
		dateEntity.regLimit === 'INF' || dateEntity.regLimit === Infinity
	);
};

/**
 * @param {Object} dateEntity    event dateEntity object
 * @return {boolean} true if regLimit property is valid
 */
const validSold = ( dateEntity ) => {
	return typeof dateEntity.sold === 'string' ||
		typeof dateEntity.sold === 'number';
};

/**
 * searchDateEntities
 * reduces dateEntities array based on value of the "searchDateName" filter
 *
 * @param {Array} dateEntities    		original dateEntities array
 * @param {string} searchText 	value for the "searchDateName" filter
 * @return {Array}         		filtered dateEntities array
 */
export const searchDateEntities = ( dateEntities, searchText = '' ) => {
	dateEntities = searchText !== '' ?
		dateEntities.filter( ( dateEntity ) => {
			return dateEntity.name.toLowerCase()
				.search( searchText.toLowerCase() ) !== -1;
		} ) :
		dateEntities;
	return dateEntities;
};
