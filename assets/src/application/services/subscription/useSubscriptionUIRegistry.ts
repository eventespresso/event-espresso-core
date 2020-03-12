import { useState } from 'react';
import { assocPath, dissocPath, omit, pathOr } from 'ramda';
import { AnyObject } from '@appServices/utilities/types';

import { ElementRegistry, SubscriptionUIRegistry, SubscriptionUIRegistryHook } from './types';

type SUIRH = SubscriptionUIRegistryHook;
type SUIR = SubscriptionUIRegistry;

let elementRegistry: ElementRegistry = {};

const useSubscriptionUIRegistry: SUIRH = ({ domain, service, path }) => {
	const [registeredElements, setRegisteredElements] = useState<AnyObject<boolean>>({});

	const pathToElements = [domain, service, ...path];
	const pathToElementsStr = pathToElements.join(':');

	const getRegistrationKey = (elementKey: string, priority: number): string => {
		return `${pathToElementsStr}:${elementKey}:${priority}`;
	};

	const registerElement: SUIR['registerElement'] = (key, component, priority = 10) => {
		const registrationKey = getRegistrationKey(key, priority);

		if (!(registrationKey in registeredElements)) {
			// Add the element to registered elements
			setRegisteredElements((elements) => ({ ...elements, [registrationKey]: true }));
			// Add the element(may be JSX) to the registry
			elementRegistry = assocPath([...pathToElements, priority, key], component, elementRegistry);
		}
	};

	const unRegisterElement: SUIR['unRegisterElement'] = (key, priority = 10) => {
		const registrationKey = getRegistrationKey(key, priority);
		if (registrationKey in registeredElements) {
			// Remove the element from registered elements
			setRegisteredElements((elements) => omit([registrationKey], elements));
		}
		// Remove the element from registry
		elementRegistry = dissocPath([...pathToElements, priority, key], elementRegistry);
	};

	/**
	 * Returns the list of registered UI elements.
	 */
	const getElements: SUIR['getElements'] = () => {
		/**
		 * This list is of this shape:
		 * {
		 *     9: {
		 *         datetimesToShow: () => null,
		 *     },
		 *     10: {
		 *         sortBy: () => null,
		 *     },
		 * }
		 */
		const elementsWithPriority = pathOr([], pathToElements, elementRegistry);
		return Object.assign({}, ...elementsWithPriority);
	};

	return { registerElement, unRegisterElement, getElements };
};

export default useSubscriptionUIRegistry;
