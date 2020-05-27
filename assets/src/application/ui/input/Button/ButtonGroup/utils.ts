import { Children, isValidElement } from 'react';

export function cleanChildren(children) {
	return Children.toArray(children).filter(isValidElement);
}
