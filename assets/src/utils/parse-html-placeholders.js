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
	if ( isEmpty( replacements ) ) {
		return placeholderText;
	}
	if ( ! Array.isArray( replacements ) ) {
		replacements = [ replacements ];
	}
	if ( ! placeholderText.includes( PLACEHOLDER ) ) {
		throw new RangeError(
			'The provided string does not have any placeholders.'
		);
	}
	const finalText = [];
	const chunks = placeholderText.split( PLACEHOLDER );
	if ( chunks.length - replacements.length !== 1 ) {
		throw new RangeError(
			'The number of text placeholders does not match' +
			' the number of replacement strings supplied.'
		);
	}
	for ( let x = 0; x < chunks.length; x++ ) {
		if ( chunks[ x ] ) {
			finalText.push( chunks[ x ] );
		}
		if ( replacements[ x ] ) {
			finalText.push( replacements[ x ] );
		}
	}
	return finalText.join( '' );
};

export default parseHtmlPlaceholders;
