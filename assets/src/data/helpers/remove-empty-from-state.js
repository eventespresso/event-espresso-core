/**
 * Utility function for recursively removing empty List/Map from the Map on the
 * given path. (Immutable.Map and Immutable.List)
 *
 * This will stop deleting paths from the state either when there are no more
 * empty values or when the count of items in the path matches the
 * lengthRemaining value.
 *
 * Note:  It's important to remember that `Immutable.List.deleteIn` and
 * `Immutable.List.delete` CANNOT be safely used in `withMutations`. So this
 * should not be used when deleting paths within a List.
 *
 * @param {Immutable.Map} state  Incoming state to recursively clear empty values from.
 * @param {Array} path The path to recursively clear empty values from in the
 * state map.
 * @param {number} lengthRemaining  What number of path items to leave remaining
 * on recursion.
 * @param {boolean} withMutations Whether to call the recursion via the
 * Immutable.withMutations function (true) or assume the incoming state is
 * already mutable (false).
 * @return {Immutable.Map} The processed state.
 */
export const removeEmptyFromState = (
	state,
	path,
	lengthRemaining = 1,
	withMutations = true
) => {
	const clearPaths = subState => {
		if ( subState.hasIn( path ) ) {
			subState.deleteIn( path );
			path.pop();
			while (
				path.length > lengthRemaining &&
				subState.getIn( path ).isEmpty()
			) {
				subState.deleteIn( path );
				path.pop();
			}
		}
	};

	return withMutations ?
		state.withMutations( subState => clearPaths( subState ) ) :
		clearPaths( state );
};
