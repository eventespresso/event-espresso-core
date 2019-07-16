/**
 * converts infinite values to null for use in forms
 *
 * @function
 * @param {number|string} number
 * @return {number|null} converted infinite value
 */
const parseInfinity = ( number ) => {
	return number !== 'INF' && number !== Infinity && number > 0 ?
		number :
		null;
};

export default parseInfinity;
