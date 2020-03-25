import React from 'react';
import { mapObjIndexed } from 'ramda';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Higher-order component creator, creating a new component which renders with
 * the given prop names, where the value passed to the underlying component is
 * the result of the query assigned as the object's value.
 *
 * @see isViewportMatch
 *
 * @param {Object} queries  Object of prop name to viewport query.
 *
 * @example
 *
 * ```jsx
 * function MyComponent( { isMobile } ) {
 * 	return (
 * 		<div>Currently: { isMobile ? 'Mobile' : 'Not Mobile' }</div>
 * 	);
 * }
 *
 * MyComponent = withViewportMatch( { isMobile: '< small' } )( MyComponent );
 * ```
 *
 * @return {Function} Higher-order component.
 */
const withViewportMatch = (queries) => {
	const useViewPortQueriesResult = () =>
		mapObjIndexed((query) => {
			let [operator, breakpointName] = query.split(' ');
			if (breakpointName === undefined) {
				breakpointName = operator;
				operator = '>=';
			}
			// Hooks should unconditionally execute in the same order,
			// we are respecting that as from the static query of the HOC we generate
			// a hook that calls other hooks always in the same order (because the query never changes).
			// eslint-disable-next-line react-hooks/rules-of-hooks
			return useViewportMatch(breakpointName, operator);
		}, queries);

	return (WrappedComponent) => {
		return (props) => {
			const queriesResult = useViewPortQueriesResult();
			return <WrappedComponent {...props} {...queriesResult} />;
		};
	};
};

export default withViewportMatch;
