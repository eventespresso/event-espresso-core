/**
 * External imports
 */
import {
	isPlainObject,
	camelCase,
	last,
} from 'lodash';

/**
 * Internal imports
 */
import { Money, SiteCurrency, ServerDateTime as DateTime } from '../../../vo';

import {
	hasRawProperty,
	hasPrettyProperty,
	hasRenderedProperty,
	isDateTimeField,
	isMoneyField,
} from './booleans';
import { maybeAssertValueObject } from './assertions';

export const maybeConvertToValueObject = ( field, value, schema ) => {
	if ( isDateTimeField( field, schema ) ) {
		return DateTime.fromISO( value );
	}
	if ( isMoneyField( field, schema ) ) {
		return new Money( value, SiteCurrency );
	}
	return value;
};

export const maybeConvertFromValueObject = ( field, value, schema ) => {
	maybeAssertValueObject( field, value, schema );
	if ( isDateTimeField( field, schema ) ) {
		value = value.toISO();
	} else if ( isMoneyField( field, schema ) ) {
		value = value.toNumber();
	}
	return value;
};

export const deriveValueForField = ( field, value, schema ) => {
	value = hasRawProperty( value ) ? value.raw : value;
	return maybeConvertToValueObject( field, value, schema );
};

export const deriveRenderedValue = ( value ) => {
	if ( ! isPlainObject( value ) ) {
		return value;
	}
	value = hasPrettyProperty( value ) ? value.pretty : value;
	value = hasRenderedProperty( value ) ? value.rendered : value;
	return hasRawProperty( value ) ? value.raw : value;
};

export const getRelationNameFromLink = ( resourceLink ) => {
	return camelCase( last( resourceLink.split( '/' ) ) );
};
