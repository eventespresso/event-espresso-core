import { pathOr, assocPath, omit, filter } from 'ramda';
import uuidv4 from 'uuid/v4';

import {
	SubscribeFn,
	Subscriptions,
	Subscription,
	SubscriptionsOptions,
	EntityActions,
	EntityActionsData,
	UpdateSubscriptionProps,
} from './types';

const NAMESPACE = 'espresso';

const useEntityActions = <Domain extends string, EntityType extends string, MenuKey extends string>(
	domain: Domain
): EntityActions<EntityType, MenuKey> => {
	const subscribe: SubscribeFn<EntityType, MenuKey> = (callback, options): VoidFunction => {
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

	const getSubscriptions = (options: SubscriptionsOptions<EntityType> = {}): Subscriptions<EntityType, MenuKey> => {
		const { entityType } = options;
		const allSubscriptions = pathOr<Subscriptions<EntityType, MenuKey>>(
			{},
			[domain, 'entityActions', 'subscriptions'],
			window[NAMESPACE]
		);
		if (entityType) {
			return filter<Subscription<EntityType, MenuKey>>(
				({ options }) => entityType === options.entityType,
				allSubscriptions
			);
		}
		return allSubscriptions;
	};

	const setSubscriptions = (subscriptions: Subscriptions<EntityType, MenuKey>): void => {
		updateEntityActions('subscriptions', subscriptions);
	};

	const updateSubscription = ({ id, callback, options, action }: UpdateSubscriptionProps<EntityType, MenuKey>) => {
		const subscriptions = getSubscriptions();

		const newSubscriptions =
			action === 'add' ? { ...subscriptions, [id]: { callback, options } } : omit([id], subscriptions);

		setSubscriptions(newSubscriptions);
	};

	const updateEntityActions = (key: keyof EntityActionsData<EntityType, MenuKey>, value: any) => {
		window[NAMESPACE] = assocPath([domain, 'entityActions', key], value, window[NAMESPACE]);
	};

	const domainSubscribeFn = pathOr<VoidFunction>(null, [domain, 'entityActions', 'subscribe'], window[NAMESPACE]);

	if (typeof domainSubscribeFn !== 'function') {
		updateEntityActions('subscribe', subscribe);
	}

	return { getSubscriptions, subscribe };
};

export default useEntityActions;
