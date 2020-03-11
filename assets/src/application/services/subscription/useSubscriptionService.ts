import { assocPath, omit } from 'ramda';
import { v4 as uuidv4 } from 'uuid';

import {
	ServiceRegistry,
	SubscriptionService,
	SubscriptionServiceHook,
	Subscriptions,
	UpdateSubscriptionProps,
} from './types';

const NAMESPACE = 'espresso';

type SS = SubscriptionService;
type SR = ServiceRegistry;

const useSubscriptionService: SubscriptionServiceHook = ({ domain, service }) => {
	const subscribe: SS['subscribe'] = (callback, options) => {
		// runtime check
		if (typeof callback !== 'function') {
			return;
		}

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

	const updateServiceRegistry = <K extends keyof SR>(key: K, value: SR[K]): void => {
		window[NAMESPACE] = assocPath([domain, service, key], value, window[NAMESPACE]);
	};

	const subscribeFn = window[NAMESPACE]?.[domain]?.[service]?.subscribe || null;

	if (typeof subscribeFn !== 'function') {
		updateServiceRegistry('subscribe', subscribe);
	}

	return { getSubscriptions, subscribe };
};

export default useSubscriptionService;
