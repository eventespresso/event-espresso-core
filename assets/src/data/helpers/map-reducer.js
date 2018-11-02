/**
 * A reducer for Map objects.
 *
 * @param {Map} map  The map object for reducing
 * @param {function} reducerCallback Same shape as callback provided for regular
 * reducers.
 * @param {*} defaultValue  The default value to provide the accumulator
 * @return {*} The reduced accumulator value.
 */
export const mapReducer = ( map, reducerCallback, defaultValue ) => {
	const keyValueCallbackHandler = ( accumulator, keyValue ) => {
		return reducerCallback( accumulator, keyValue[ 1 ], keyValue[ 0 ] );
	};
	return Array
		.from( map.entries() )
		.reduce( keyValueCallbackHandler, defaultValue );
};
