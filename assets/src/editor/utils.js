
/**
 * @function
 * @param {string} cuid
 * @param {number} start
 * @param {number} end
 * @return {string} cuid snippet
 */
export const shortenCuid = ( cuid, start = 12, end = 18 ) => {
	if ( cuid.hasOwnProperty( 'length' ) && cuid.length > end ) {
		// use a smaller more unique portion of the CUID
		return cuid.substring( start, end );
	}
	return cuid;
};
