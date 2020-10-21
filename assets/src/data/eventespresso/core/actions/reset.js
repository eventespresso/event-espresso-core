/**
 * External imports
 */
import { singularModelName } from '@eventespresso/model';
import { some, keys } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { select as dataSelect } from '@wordpress/data';

/**
 * Internal imports
 */
import { dispatch, select } from '../../base-controls';
import { ACTION_TYPES } from './action-types';
import { REDUCER_KEY } from '../constants';
import * as modelSpecificSelectors from '../model/model-selectors-index';

const { resets: types } = ACTION_TYPES;

/**
 * Resets the entire state to its default for the store.
 */
export function* resetAllState() {
	// action for resetting the entire state.
	yield {
		type: types.RESET_ALL_STATE,
	};

	// get resolvers from core/data and dispatch invalidation of each resolver.
	const resolvers = yield select(
		'core/data',
		'getCachedResolvers',
		REDUCER_KEY
	);

	if (invalidateActionsAvailable()) {
		yield dispatch(
			'core/data',
			'invalidateResolutionForStore',
			REDUCER_KEY
		);
		return;
	}

	// dispatch invalidation of the cached resolvers
	for (const selector in resolvers) {
		for (const entry of resolvers[selector]._map) {
			yield dispatch(
				'core/data',
				'invalidateResolution',
				REDUCER_KEY,
				selector,
				entry[0]
			);
		}
	}
}

/**
 * Resets all state related to the given modelName
 *
 * Note: This does not reset any state in the modelSpecific tree as there is no
 * way to know what applies to the current model.
 *
 * @param {string} modelName
 */
export function* resetStateForModel(modelName) {
	modelName = singularModelName(modelName);
	yield {
		type: types.RESET_STATE_FOR_MODEL,
		modelName,
	};

	// get resolvers from core/data
	const resolvers = yield select(
		'core/data',
		'getCachedResolvers',
		REDUCER_KEY
	);

	// dispatch invalidation of the cached resolvers for any resolver that
	// has a variation of modelName in the selector name or in the args for the
	// cached resolver.
	for (const selector in resolvers) {
		for (const entry of resolvers[selector]._map) {
			if (
				(modelNameInSelector(selector, modelName) ||
					modelNameInArgs(entry[0], modelName)) &&
				!selectorIsModelSpecific(selector)
			) {
				yield dispatch(
					'core/data',
					'invalidateResolution',
					REDUCER_KEY,
					selector,
					entry[0]
				);
			}
		}
	}
}

/**
 * Helper for determining whether the given modelName is found in the given
 * selectorName.
 *
 * @param {string} selectorName
 * @param {string} modelName
 *
 * @return {boolean} True means it is present, false means it isn't
 */
const modelNameInSelector = (selectorName, modelName) => {
	const singularName = singularModelName(modelName);
	selectorName = selectorName.toLowerCase();
	return selectorName.indexOf(singularName) > -1;
};

/**
 * Helper for determining whether the given modelName is found in the given
 * set of args.
 *
 * This also considers if any of the args are an instance of BaseEntity and
 * if that BaseEntity instance is for the given model.
 *
 * @param {Array} args
 * @param {string} modelName
 *
 * @return {boolean}  True means it is present, false means it isn't.
 */
const modelNameInArgs = (args, modelName) => {
	const singularName = singularModelName(modelName);
	const hasModelName = args.indexOf(singularName) > -1;
	if (hasModelName) {
		return true;
	}

	// it's possible one of the args is an instance of BaseEntity.  If so,
	// then let's compare against the modelName on the entity instance.
	return some(args, (arg) => {
		return isModelEntityOfModel(arg, singularName);
	});
};

/**
 * For the given selector name and (optional) selectorsToInvalidate, this
 * returns whether the selectorName is a match for the selectors to invalidate.
 *
 * @param {string} selectorName
 * @param {Array|null?} selectorsToInvalidate If null, then the match array will
 * be obtained from the registered modelSpecificSelectors imported for the
 * module
 *
 * @return {boolean} True means there is a match, false means there is not.
 */
const selectorIsModelSpecific = (
	selectorName,
	selectorsToInvalidate = null
) => {
	selectorsToInvalidate =
		selectorsToInvalidate === null
			? keys(modelSpecificSelectors)
			: selectorsToInvalidate;
	return selectorsToInvalidate.indexOf(selectorName) > -1;
};

/**
 * Resets all model specific state (optionally restricted to the given selector
 * name if present).
 *
 * @param {string} selectorName  If present then state will only be reset for
 * the specific selector.  Otherwise all model specific state is reset.
 */
export function* resetAllModelSpecific(selectorName) {
	yield {
		type:
			selectorName === undefined
				? types.RESET_ALL_MODEL_SPECIFIC
				: types.RESET_MODEL_SPECIFIC_FOR_SELECTOR,
		selector: selectorName,
	};

	// get resolvers
	const resolvers = yield select(
		'core/data',
		'getCachedResolvers',
		REDUCER_KEY
	);

	const selectorsToInvalidate = keys(modelSpecificSelectors);

	// dispatch invalidation of the cached resolvers for model specific selector
	for (const selector in resolvers) {
		if (selectorName === undefined || selectorName === selector) {
			for (const entry of resolvers[selector]._map) {
				if (selectorIsModelSpecific(selector, selectorsToInvalidate)) {
					yield dispatch(
						'core/data',
						'invalidateResolution',
						REDUCER_KEY,
						selector,
						entry[0]
					);
				}
			}
		}
	}
}

/**
 * Reset model specific state for the given selector name.
 *
 * @param {string} selectorName
 */
export function* resetModelSpecificForSelector(selectorName) {
	yield* resetAllModelSpecific(selectorName);
}

/**
 * Resets all state for a given model specific selector and its args
 *
 * @param {string} selectorName
 * @param {Array} args
 */
export function* resetModelSpecificForSelectorAndArgs(selectorName, ...args) {
	yield {
		type: types.RESET_MODEL_SPECIFIC_FOR_SELECTOR_AND_ARGS,
		selector: selectorName,
		args,
	};

	yield dispatch(
		'core/data',
		'invalidateResolution',
		REDUCER_KEY,
		selectorName,
		args
	);
}

/**
 * Helper for determining if actions are available in the `core/data` package.
 *
 * @return {boolean}  True means additional invalidation actions available.
 */
const invalidateActionsAvailable = () => {
	return dataSelect('core/data').invalidateResolutionForStore !== undefined;
};
