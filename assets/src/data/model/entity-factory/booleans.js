/**
 * External imports
 */
import { isPlainObject } from 'lodash';

export const hasRawProperty = ( value ) => {
	return isPlainObject( value ) && value.raw;
};

export const hasPrettyProperty = ( value ) => {
	return isPlainObject( value ) && value.pretty;
};

export const hasRenderedProperty = ( value ) => {
	return isPlainObject( value ) && value.rendered;
};

export const isDateTimeField = ( field, schema ) => {
	return schema[ field ].format &&
		schema[ field ].format === 'date-time';
};

export const isUTCDateTimeField = ( dateTimeFieldName, schema = null ) => {
	return schema !== null ?
		isDateTimeField( dateTimeFieldName, schema ) &&
		dateTimeFieldName.indexOf( '_gmt' ) > -1 :
		dateTimeFieldName.indexOf( 'gmt' ) > -1;
};

export const isEntityField = ( fieldName, schema ) => {
	// if is "GMT" field or `readable` is false then we it's not am
	// "entity field"
	return schema[ fieldName ] &&
		schema[ fieldName ].readable &&
		! isUTCDateTimeField( fieldName );
};

export const isMoneyField = ( field, schema ) => {
	return schema[ field ].properties &&
		schema[ field ].properties.pretty &&
		schema[ field ].properties.pretty.format &&
		schema[ field ].properties.pretty.format === 'money';
};

export const isEnumField = ( field, schema ) => {
	return schema[ field ].enum && schema[ field ].enum.length;
};
