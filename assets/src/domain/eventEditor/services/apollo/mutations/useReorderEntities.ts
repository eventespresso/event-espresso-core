import { useCallback } from 'react';
import { clone } from 'ramda';
import { Datetime, Ticket } from '../types';

type Entity = Datetime | Ticket;

interface ReorderEntitiesProps {
	entityType: 'DATETIME' | 'TICKET';
}

interface CallbackArgs<E extends Entity> {
	allEntities: Array<E>;
	filteredEntities: Array<E>;
	newIndex: number;
	oldIndex: number;
}

type ReorderCallback<E extends Entity> = (args: CallbackArgs<E>) => Array<E>;

const useReorderEntities = <E extends Entity>({ entityType }: ReorderEntitiesProps): ReorderCallback<E> => {
	return useCallback<ReorderCallback<E>>(
		({ allEntities: allEntitiesList, filteredEntities, newIndex, oldIndex }) => {
			if (newIndex === oldIndex || newIndex < 0 || oldIndex < 0) {
				return;
			}

			const entities = clone(filteredEntities);
			const allEntities = clone(allEntitiesList);

			// remove entity from existing location in filtered list
			const [removed] = entities.splice(oldIndex, 1);
			// insert removed entity into new location in same list
			entities.splice(newIndex, 0, removed);
			// now loop thru entities in filtered list
			entities.map((entity, index) => {
				// reset the order property for all entities in filtered list
				entity.order = index + 1;
				// grab index of reordered entities in list of all entities
				const indexInAll = allEntities.findIndex((item) => item.id === entity.id);
				// remove reordered entities from list of all entities
				allEntities.splice(indexInAll, 1);

				return entity;
			});
			// reorder the list of all entities as well...
			// reverse the reordered list of entities
			const reversed = entities.reverse();
			reversed.forEach((entity) => {
				// add each entity to the beginning of the allEntities array
				allEntities.unshift(entity);
			});
			// but now we need to reset the order properties for ALL entities
			allEntities.map((entity, index) => {
				// add 1 so we don't end up with order: 0
				entity.order = index + 1;
				return entity;
			});

			return allEntities;
		},
		[entityType]
	);
};

export default useReorderEntities;
