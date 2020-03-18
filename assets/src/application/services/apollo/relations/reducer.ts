import { pathOr, assocPath, dissocPath, clone } from 'ramda';
import { RelationsReducer, RelationalData } from './types';

const reducer: RelationsReducer = (state, action) => {
	const { entity, entityId, relation, relationId, relationIds } = action;
	let newState: RelationalData, relations: string[];
	switch (action.type) {
		case 'INITIALIZE':
			return action.data;

		case 'ADD_RELATION':
			relations = pathOr([], [entity, entityId, relation], state);
			// If the relation already exists
			if (relations.includes(relationId)) {
				return state;
			}
			newState = assocPath([entity, entityId, relation], [...relations, relationId], state);
			return newState;

		case 'REMOVE_RELATION':
			newState = clone(state);
			// existing relation list.
			relations = pathOr([], [entity, entityId, relation], newState);
			// if relationId is given remove it from the list.
			if (relationId) {
				return assocPath(
					[entity, entityId, relation],
					relations.filter((id) => id !== relationId),
					newState
				);
			}

			if (relations.length) {
				/**
				 * If we are here, it means that we have values for `entityId` in `relation`
				 * i.e. if we are trying to remove a datetime (`entityId`) from all the tickets
				 * we luckily have `state.datetimes[entityId].tickets` list, which means we know
				 * from where to remove `entityId`.
				 */
				relations.forEach((id) => {
					newState = assocPath(
						[relation, id, entity],
						pathOr([], [relation, id, entity], newState).filter((_id: string) => _id !== entityId),
						newState
					);
				});
				return newState;
			}
			/**
			 * If we are here it means that we don't have the values for `entityId` in `relation`
			 * which means we will have to loop through all the entries in `state[relation]`
			 * to remove `entityId` from them.
			 * For example if we are trying to remove a datetime (`entityId`) from all the tickets,
			 * We will loop through `state.tickets` to delete `entityId` from `state.tickets[ticketId].datetimes`
			 */
			for (const id in newState[relation]) {
				newState = assocPath(
					[relation, id, entity],
					pathOr([], [relation, id, entity], newState).filter((_id: string) => _id !== entityId),
					newState
				);
			}
			return newState;

		case 'UPDATE_RELATIONS':
			newState = assocPath([entity, entityId, relation], relationIds, state);
			return newState;

		case 'DROP_RELATIONS':
			newState = dissocPath([entity, entityId], state);
			return newState;

		default:
			throw new Error();
	}
};

export default reducer;
