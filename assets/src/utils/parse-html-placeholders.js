/**
 * External imports
 */
import { isEmpty } from 'lodash';

const PLACEHOLDER = '%%var%%';

/**
 * kinda like a weaker version of sprintf that won't choke on HTML elements
 *
 * @function
 * @param {string} placeholderText
 * @param {Array} replacements
 * @return {string} text with placeholders replaced by variables
 */
const parseHtmlPlaceholders = ( placeholderText, replacements ) => {
	if (
		isEmpty( replacements ) ||
		! placeholderText.includes( PLACEHOLDER )
	) {
		return placeholderText;
	}
	if ( ! Array.isArray( replacements ) ) {
		replacements = [ replacements ];
	}
	const finalText = [];
	const chunks = placeholderText.split( PLACEHOLDER );
	if ( chunks.length - replacements.length !== 1 ) {
		throw new RangeError(
			'The number of text placeholders does not match' +
			' the number of replacement strings supplied.'
		);
	}
	chunks.forEach( ( chunk, index ) => {
		finalText.push( chunk );
		if ( replacements[ index ] ) {
			finalText.push( replacements[ index ] );
		}
	} );
	return finalText.join( '' );
};

export default parseHtmlPlaceholders;
