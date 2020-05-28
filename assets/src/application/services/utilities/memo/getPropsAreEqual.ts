import React from 'react';
import { path, Path } from 'ramda';
import { AnyObject } from '../types';

type PropsAreEqual<P extends AnyObject> = (
	prevProps: Readonly<React.PropsWithChildren<P>>,
	nextProps: Readonly<React.PropsWithChildren<P>>
) => boolean;

/**
 * Generates the comparison function that can be used as second argument to React.memo()
 */
const getPropsAreEqual = <P extends AnyObject>(...paths: Array<Path>): PropsAreEqual<P> => {
	const propsAreEqual: PropsAreEqual<P> = (prevProps, nextProps): boolean => {
		for (const pathToValue of paths) {
			const prevValue = path<any>(pathToValue, prevProps);
			const nextValue = path<any>(pathToValue, nextProps);

			if (prevValue !== nextValue) {
				return false;
			}
		}
		return true;
	};

	return propsAreEqual;
};

export default getPropsAreEqual;
