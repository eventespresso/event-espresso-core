/**
 * External imports
 */
import { sprintf } from '@eventespresso/i18n';
import { isModelEntity } from '@eventespresso/validators';

/** get-entity-model-name
 * returns the modelName property if entity is indeed an entity
 * or just returns entity if it is already a string (like 'ticket')
 *
 * @function
 * @param {Object} entity
 * @param {boolean} throwError
 * @return {string} model name
 */
const getEntityModelName = ( entity, throwError = false ) => {
	if ( typeof entity === 'string' ) {
		return entity;
	}
	if ( isModelEntity( entity ) ) {
		return entity.modelName;
	}
	if ( ! throwError ) {
		return '';
	}
	throw new TypeError(
		sprintf(
			'Can not retrieve the model name because an invalid entity was supplied: %s',
			JSON.stringify( entity )
		)
	);
};

export default getEntityModelName;
