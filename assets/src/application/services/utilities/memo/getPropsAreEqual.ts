import React from 'react';
import { path } from 'ramda';

type PropsAreEqual<P extends {}> = (
	prevProps: Readonly<React.PropsWithChildren<P>>,
	nextProps: Readonly<React.PropsWithChildren<P>>
) => boolean;

/**
 * Generates the comparison function that can be used as second argument to React.memo()
 */
const getPropsAreEqual = <P extends {}>(pathToValue: Parameters<typeof path>[0]): PropsAreEqual<P> => {
	const propsAreEqual: PropsAreEqual<P> = (prevProps, nextProps): boolean => {
		const prevValue = path<any>(pathToValue, prevProps);
		const nextValue = path<any>(pathToValue, nextProps);
		return prevValue === nextValue;
	};

	return propsAreEqual;
};

export default getPropsAreEqual;
