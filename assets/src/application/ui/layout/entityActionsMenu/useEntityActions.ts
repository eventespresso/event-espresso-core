import { pathOr, assocPath, omit, filter } from 'ramda';
import { v4 as uuidv4 } from 'uuid';

import { Subscriptions, EntityActions, EntityActionsData, UpdateSubscriptionProps } from './types';

const NAMESPACE = 'espresso';

type EA = EntityActions;

const useEntityActions = <Domain extends string>(domain: Domain): EntityActions => {
	const subscribe: EA['subscribe'] = (callback, options) => {
		// runtime check
		if (typeof callback !== 'function') {
			return;
		}

		const subscriptionId = uuidv4();

		updateSubscription({ id: subscriptionId, callback, options, action: 'add' });

		// to unsubscribe
		return () => {
			updateSubscription({ id: subscriptionId, action: 'remove' });
		};
	};

	const getSubscriptions: EA['getSubscriptions'] = (options = {}) => {
		const { entityType } = options;
		const allSubscriptions = pathOr({}, [domain, 'entityActions', 'subscriptions'], window[NAMESPACE]);
		if (entityType) {
			return filter(({ options }) => entityType === options.entityType, allSubscriptions);
		}
		return allSubscriptions;
	};

	const setSubscriptions = (subscriptions: Subscriptions<any, string>): void => {
		updateEntityActions('subscriptions', subscriptions);
	};

	const updateSubscription = ({ id, callback, options, action }: UpdateSubscriptionProps) => {
		const subscriptions = getSubscriptions();

		const newSubscriptions =
			action === 'add' ? { ...subscriptions, [id]: { callback, options } } : omit([id], subscriptions);

		setSubscriptions(newSubscriptions);
	};

	const updateEntityActions = (key: keyof EntityActionsData, value: any) => {
		window[NAMESPACE] = assocPath([domain, 'entityActions', key], value, window[NAMESPACE]);
	};

	const domainSubscribeFn = pathOr<VoidFunction>(null, [domain, 'entityActions', 'subscribe'], window[NAMESPACE]);

	if (typeof domainSubscribeFn !== 'function') {
		updateEntityActions('subscribe', subscribe);
	}

	return { getSubscriptions, subscribe };
};

export default useEntityActions;
