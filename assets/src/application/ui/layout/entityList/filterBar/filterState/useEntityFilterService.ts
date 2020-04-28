import { useCallback } from 'react';
import { Entity } from '@appServices/apollo/types';
import { EntityFilterService, EntityListFilterStateManager } from './types';
import { useFilterBarService, FilterBarServiceCbArgs } from '../subscription';
import { SubscriptionCallback } from '@appServices/subscription';
import { sortBy, pathOr } from 'ramda';

type ELFSM = EntityListFilterStateManager;

const useEntityFilterService = <D extends string, L extends string, E extends Entity, FS extends ELFSM>(
	domain: D,
	listId: L
): EntityFilterService<E, FS> => {
	type EFS = EntityFilterService<E, FS>;

	const { getFilters, getSearches, getSorters } = useFilterBarService<D, L, E, ELFSM>(domain, listId);

	const getCallbackList = (
		mappedCallbackList: ReturnType<typeof getFilters>
	): Array<SubscriptionCallback<FilterBarServiceCbArgs<E, ELFSM>, E[]>> => {
		const subscriptions = sortBy(pathOr(10, ['options', 'priority']), Object.values(mappedCallbackList));
		return subscriptions.map(({ callback }) => callback);
	};

	const applyCallbacks = (
		entityList: Array<E>,
		filterState: FS,
		mappedCallbackList: ReturnType<typeof getFilters>
	): Array<E> => {
		let filteredEntities = entityList;

		const callbacks = getCallbackList(mappedCallbackList);

		callbacks.forEach((callback) => {
			filteredEntities = callback({ entityList: filteredEntities, filterState });
		});

		return filteredEntities;
	};

	const applyFilters: EFS['applyFilters'] = useCallback(
		(entityList, filterState) => {
			return applyCallbacks(entityList, filterState, getFilters());
		},
		[domain, listId]
	);

	const applySearches: EFS['applySearches'] = useCallback(
		(entityList, filterState) => {
			return applyCallbacks(entityList, filterState, getSearches());
		},
		[domain, listId]
	);

	const applySorters: EFS['applySorters'] = useCallback(
		(entityList, filterState) => {
			return applyCallbacks(entityList, filterState, getSorters());
		},
		[domain, listId]
	);

	return {
		applyFilters,
		applySearches,
		applySorters,
	};
};

export default useEntityFilterService;
