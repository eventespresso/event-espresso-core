/**
 * External imports
 */
import createSelector from 'rememo';

/**
 * Returns the value for the given selector and args in the current state.
 *
 * @type {*} Returns whatever the value was assigned to the state for the given
 * selector and its args.
 */
export const getSelectorValue = createSelector(
	( state, selector, ...args ) => {
		return state.modelSpecific.getIn(
			[ selector, JSON.stringify( args ) ]
		) || null;
	},
	( state, selector, ...args ) => [
		state.modelSpecific.getIn( [
			selector,
			JSON.stringify( args ),
		] ),
	],
);
