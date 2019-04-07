/**
 * External imports
 */
import { omit } from 'lodash';

/**
 * @function
 * @param {Object} attributes
 * @return {Object} attributes
 */
export const cleanUpInputAttributes = ( attributes = {} ) => {
	return omit( attributes, [
		'children',
		'colSize',
		'helpText',
		'helpTextID',
		'label',
		'render',
		'validations',
	] );
};

/**
 * @function
 * @param {Array} validators
 * @return {Function} combined validation function
 */
export const composeValidators = ( ...validators ) => ( value ) => {
	return validators.reduce(
		( error, validator ) => error || validator( value ),
		undefined
	);
};

/**
 * loops through the input's set validators and
 * adds attributes for corresponding HTML attributes accordingly.
 * Right now, this is only doing so for the "required" validator.
 *
 * @function
 * @param {Object} attributes
 * @param {Array} validators
 * @return {Object} attributes
 */
export const addValidatorsToAttributes = (
	attributes = {},
	validators = [],
) => {
	validators.forEach(
		( validator ) => {
			const name = validator && validator.name ? validator.name : '';
			switch ( name ) {
				case 'required' :
					attributes.required = true;
					break;
			}
		}
	);
	return attributes;
};

/**
 * @function
 * @param {Array} options
 * @return {Array} values
 */
export const getValuesForOptions = ( options ) => options.map(
	( option ) => option.value
);

/**
 * @function
 * @param {Object} dataSet
 * @return {Object} dataSet
 */
export const prepareDataSet = ( dataSet = {} ) => {
	for ( const key in dataSet ) {
		if ( dataSet.hasOwnProperty( key ) ) {
			if ( ! key.startsWith( 'data-' ) ) {
				dataSet[ `data-${ key }` ] = dataSet[ key ];
				delete dataSet[ key ];
			}
		}
	}
	return dataSet;
};
