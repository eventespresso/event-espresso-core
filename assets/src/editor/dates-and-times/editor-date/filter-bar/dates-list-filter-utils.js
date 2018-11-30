/**
 * External imports
 */
import { filter, first, sortBy } from 'lodash';
import moment from 'moment';

/**
 * filterDates
 * reduces dates array based on value of the "show" filter
 *
 * @param {Array} dates    original dates array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered dates array
 */
export const filterDates = ( dates, show = 'active-upcoming' ) => {
	switch ( show ) {
		case 'all' :
			return dates;
		case 'active-upcoming' :
			return filter(
				dates,
				function( date ) {
					return validStatus( date ) &&
						( date.status === 'DTA' || date.status === 'DTU' );
				}
			);
		case 'active-only' :
			return filter( dates, { status: 'DTA' } );
		case 'upcoming-only' :
			return filter( dates, { status: 'DTU' } );
		case 'next-active-upcoming-only' :
			dates = filterDates( dates );
			dates = sortDates( dates );
			return [ first( dates ) ];
		case 'sold-out-only' :
			return filter(
				dates,
				function( date ) {
					return (
						validStatus( date ) && date.status === 'DTS'
					) || capacityAtOrAbove( date, 100 );
				}
			);
		case 'above-90-capacity' :
			return filter(
				dates,
				function( date ) {
					return capacityAtOrAbove( date, 90 );
				}
			);
		case 'above-75-capacity' :
			return filter(
				dates,
				function( date ) {
					return capacityAtOrAbove( date, 75 );
				}
			);
		case 'above-50-capacity' :
			return filter(
				dates,
				function( date ) {
					return capacityAtOrAbove( date, 50 );
				}
			);
		case 'below-50-capacity' :
			return filter(
				dates,
				function( date ) {
					return capacityBelow( date, 50 );
				}
			);
		case 'expired-only' :
			return filter( dates, { status: 'DTE' } );
	}
	return dates;
};

/**
 * filterDates
 * reduces dates array based on value of the "order" filter
 *
 * @param {Array} dates    original dates array
 * @param {string} order   value for the "order" filter
 * @return {Array}         filtered dates array
 */
export const sortDates = ( dates, order = 'chronologically' ) => {
	const now = new moment();
	switch ( order ) {
		case 'chronologically' :
			dates = sortBy(
				dates,
				[
					function( date ) {
						return now.isBefore( date.start );
					},
				]
			);
			break;
		case 'by-name' :
			dates = sortBy( dates, [ 'name' ] );
			break;
		case 'by-id' :
			dates = sortBy( dates, [ 'id' ] );
			break;
		case 'by-order' :
			dates = sortBy( dates, [ 'order' ] );
			break;
	}
	return dates;
};

/**
 * @param {Object} date    event date object
 * @param {number} capacity
 * @return {boolean} true if sold/regLimit >= capacity
 */
const capacityAtOrAbove = ( date, capacity ) => {
	return validSold( date ) &&
		validFiniteReglimit( date ) &&
		(
			parseInt( date.sold ) /
			parseInt( date.regLimit ) >= ( capacity / 100 )
		);
};

/**
 * @param {Object} date    event date object
 * @param {number} capacity
 * @return {boolean} true if sold/regLimit less than than capacity
 */
const capacityBelow = ( date, capacity ) => {
	return (
		validInfiniteReglimit( date )
	) || (
		validSold( date ) &&
		validFiniteReglimit( date ) &&
		(
			parseInt( date.sold ) /
			parseInt( date.regLimit ) < ( capacity / 100 )
		)
	);
};

/**
 * @param {Object} date    event date object
 * @return {boolean} true if regLimit property is valid
 */
const validStatus = date => {
	return typeof date.status === 'string';
};

/**
 * @param {Object} date    event date object
 * @return {boolean} true if regLimit property is valid
 */
const validReglimit = date => {
	return typeof date.regLimit === 'string' ||
		typeof date.regLimit === 'number';
};

/**
 * @param {Object} date    event date object
 * @return {boolean} true if regLimit property is valid and NOT infinite
 */
const validFiniteReglimit = date => {
	return validReglimit( date ) && date.regLimit !== 'INF';
};

/**
 * @param {Object} date    event date object
 * @return {boolean} true if regLimit property is valid and unlimited
 */
const validInfiniteReglimit = date => {
	return validReglimit( date ) && date.regLimit === 'INF';
};

/**
 * @param {Object} date    event date object
 * @return {boolean} true if regLimit property is valid
 */
const validSold = date => {
	return typeof date.sold === 'string' ||
		typeof date.sold === 'number';
};
