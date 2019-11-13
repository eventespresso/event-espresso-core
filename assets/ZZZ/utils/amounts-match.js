/**
 * @function
 * @param {number|string} v1
 * @param {number|string} v2
 * @return {boolean} true if values match after conversion to float
 */
const amountsMatch = ( v1, v2 ) => parseFloat( v1 ) === parseFloat( v2 );

export default amountsMatch;
