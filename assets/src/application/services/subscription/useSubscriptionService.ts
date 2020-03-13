import { assocPath, omit } from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import invariant from 'invariant';

import { SubscriptionService, SubscriptionServiceHook, Subscriptions, UpdateSubscriptionProps } from './types';

const NAMESPACE = 'espresso';

type SS = SubscriptionService;
const useSubscriptionService: SubscriptionServiceHook = ({ domain, service }) => {
	const subscribe: SS['subscribe'] = (callback, options) => {
		invariant(typeof callback === 'function', 'subscribe `callback` must be a function');

		const subscriptionId = uuidv4();

		updateSubscription({ id: subscriptionId, callback, options, action: 'add' });

		// to unsubscribe
		return (): void => {
			updateSubscription({ id: subscriptionId, action: 'remove' });
		};
	};

	const getSubscriptions: SS['getSubscriptions'] = () => {
		return window[NAMESPACE]?.[domain]?.[service]?.subscriptions || {};
	};

	const getServiceRegistryItem: SS['getServiceRegistryItem'] = (key, defaultValue) => {
		return window[NAMESPACE]?.[domain]?.[service]?.[key] || defaultValue;
	};

	const addToServiceRegistry: SS['addToServiceRegistry'] = (key, value) => {
		updateServiceRegistry(key, value);
	};

	/**
	 * Updates/Sets/Exposes the value globally
	 */
	const updateServiceRegistry: SS['addToServiceRegistry'] = (key, value) => {
		window[NAMESPACE] = assocPath([domain, service, key], value, window[NAMESPACE]);
	};

	const updateSubscription = ({ id, callback, options, action }: UpdateSubscriptionProps): void => {
		const subscriptions = getSubscriptions();

		const newSubscriptions =
			action === 'add'
				? {
						...subscriptions,
						[id]: { callback, options },
				  }
				: omit([id], subscriptions);

		setSubscriptions(newSubscriptions);
	};

	const setSubscriptions = (subscriptions: Subscriptions): void => {
		updateServiceRegistry('subscriptions', subscriptions);
	};

	const subscribeFn = getServiceRegistryItem('subscribe');

	// check if the `subscribe` function path has not been exposed globally
	if (typeof subscribeFn !== 'function') {
		addToServiceRegistry('subscribe', subscribe);
	}

	return {
		addToServiceRegistry,
		getServiceRegistryItem,
		getSubscriptions,
		subscribe,
	};
};

export default useSubscriptionService;
