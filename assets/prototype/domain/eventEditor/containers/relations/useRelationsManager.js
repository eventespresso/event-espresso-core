import { useReducer, useEffect } from '@wordpress/element';
import useFetchRelations from '../queries/useFetchRelations';
import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

const useRelationsManager = ({ eventId }) => {

	const [state, dispatch] = useReducer(relationsReducer, {});

	const onReceiveRelations = ({ eventRelations = '{}' }) => {
		dispatch({ type: 'SET_DATA', data: JSON.parse(eventRelations) });
	};

	useEffect(() => {
		console.log('>>>>>>>>>', state);
	}, [state]);

	/**
	 * For a given `objectType` identified by `objectId`
	 * it returns a list of globally unique Ids of `relatedType`
	 *
	 * @param {String} objectType 
	 * @param {String} objectId 
	 * @param {String} relatedType 
	 */
	const getRelations = (objectType, objectId, relatedType) => {
		return get(state, [objectType, objectId, relatedType], []);
	};

	/**
	 * Adds a relations between two objects.
	 *
	 * @param {String} objectType 
	 * @param {String} objectId 
	 * @param {String} relatedType 
	 * @param {String} relatedId 
	 */
	const addRelation = (objectType, objectId, relatedType, relatedId) => {
		dispatch({
			type: 'ADD_RELATION',
			objectType,
			objectId,
			relatedType,
			relatedId,
		});
	};

	/**
	 * Sets the relation between an object and related type objects
	 * Overrides old relations.
	 *
	 * @param {String} objectType 
	 * @param {String} objectId 
	 * @param {String} relatedType
	 * @param {String[]} relatedIds
	 */
	const setRelation = (objectType, objectId, relatedType, relatedIds) => {
		console.log({ objectType, objectId, relatedType, relatedIds });
		dispatch({
			type: 'SET_RELATION',
			objectType,
			objectId,
			relatedType,
			relatedIds,
		});
	};

	/**
	 * Removes a relations between two objects.
	 *
	 * @param {String} objectType 
	 * @param {String} objectId 
	 * @param {String} relatedType 
	 * @param {String} relatedId 
	 */
	const removeRelation = (objectType, objectId, relatedType, relatedId) => {
		dispatch({
			type: 'REMOVE_RELATION',
			objectType,
			objectId,
			relatedType,
			relatedId,
		});
	};

	useFetchRelations({ eventId, onReceiveRelations });

	return {
		getRelations,
		addRelation,
		removeRelation,
		setRelation,
	};
};

const relationsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_DATA':
			return action.data;
		case 'SET_RELATION':
			const {
				objectType,
				objectId,
				relatedType,
				relatedIds,
			} = action;
			const newState = cloneDeep(state);
			set(newState, [objectType, objectId, relatedType], relatedIds);
			console.log({ newState });
			return newState;
		default:
			throw new Error();
	}
};

export default useRelationsManager;
