import { pathOr, assocPath, omit } from 'ramda';
import uuidv4 from 'uuid/v4';

import { SubscribeFn, Subscriptions, EntityActions, EntityActionsData, UpdateSubscriptionProps } from './types';

const NAMESPACE = 'espresso';

const useEntityActions = <Domain extends string, MenuKey extends string>(domain: Domain): EntityActions<MenuKey> => {
	const subscribe: SubscribeFn<MenuKey> = (callback): VoidFunction => {
		// runtime check
		if (typeof callback !== 'function') {
			return;
		}

		const subscriptionId = uuidv4();

		updateSubscription({ id: subscriptionId, callback, action: 'add' });

		// to unsubscribe
		return () => {
			updateSubscription({ id: subscriptionId, callback, action: 'remove' });
		};
	};

	const getSubscriptions = (): Subscriptions<MenuKey> => {
		return pathOr<Subscriptions<MenuKey>>({}, [domain, 'entityActions', 'subscriptions'], window[NAMESPACE]);
	};

	const setSubscriptions = (subscriptions: Subscriptions<MenuKey>): void => {
		updateEntityActions('subscriptions', subscriptions);
	};

	const updateSubscription = ({ id, callback, action }: UpdateSubscriptionProps<MenuKey>) => {
		const subscriptions = getSubscriptions();

		const newSubscriptions = action === 'add' ? { ...subscriptions, [id]: callback } : omit([id], subscriptions);

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
