/**
 * External imports
 */
import { isArray } from 'lodash';
import PropTypes from 'prop-types';

/**
 * finds maximum option value length to determine label size
 *
 * @function
 * @param {Array} options
 * @return {string} css class describing label size
 */
export const OptionLabelSize = ( options ) => {
	let size = 0;
	options = isArray( options ) ? options : [];
	options.forEach( function( option ) {
		size = option.label.length > size ? option.label.length : size;
	} );
	let labelSize = ' medium-lbl';
	if ( size < 3 ) {
		labelSize = ' nano-lbl';
	} else if ( size < 6 ) {
		labelSize = ' micro-lbl';
	} else if ( size < 12 ) {
		labelSize = ' tiny-lbl';
	} else if ( size < 25 ) {
		labelSize = ' small-lbl';
	} else if ( size < 50 ) {
		labelSize = ' medium-lbl';
	} else if ( size >= 100 ) {
		labelSize = ' big-lbl';
	}
	return labelSize;
};

OptionLabelSize.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType( [
				PropTypes.number,
				PropTypes.string,
			] ),
		} ),
	),
};
