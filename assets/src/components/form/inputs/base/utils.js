/**
 * @function
 * @param {Object} attributes
 * @return {Object} attributes
 */
export const cleanUpInputAttributes = ( attributes = {} ) => {
	delete attributes.children;
	delete attributes.colSize;
	delete attributes.helpText;
	delete attributes.helpTextID;
	delete attributes.initialValue;
	delete attributes.label;
	delete attributes.render;
	delete attributes.validations;
	return attributes;
};

/**
 * @function
 * @param {Array} validators
 * @return {Function} combined validation function
 */
export const composeValidators = ( ...validators ) => value => {
	return validators.reduce(
		( error, validator ) => error || validator( value ),
		undefined
	);
};

/**
 * @function
 * @param {Object} attributes
 * @param {Array} validators
 * @return {Object} attributes
 */
export const mapValidatorsToAttributes = (
	attributes = {},
	validators = [],
) => {
	validators.forEach(
		validator => {
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
export const getValuesForOptions = options => options.map(
	( option ) => option.value
);

/**
 * @function
 * @param {Object} dataSet
 * @return {Object} dataSet
 */
export const validateDataSet = ( dataSet = {} ) => {
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
