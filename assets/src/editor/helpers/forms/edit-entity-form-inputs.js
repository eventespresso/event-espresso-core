/**
 * External imports
 */
import { indexOf } from 'lodash';
import { isModelEntity } from '@eventespresso/validators';
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * External imports
 */
import { generateFormInputFromConfig } from './generate-form-input-from-config';

/**
 * returns an array of inputs corresponding to
 * the properties of an EE model Entity
 *
 * @function
 * @param {Object} entity  EE model object
 * @param {Object} inputConfig input generation details
 * @param {string} formDataKeyPrefix  string prepended to form data keys
 * @param {Object} formDataValues form input values
 * @param {Array} exclude  Array of field ids to not display inputs for
 * @return {Array} form inputs
 */
export const editEntityFormInputs = (
	entity,
	inputConfig,
	formDataKeyPrefix,
	formDataValues = {},
	exclude = [],
) => {
	if ( ! isModelEntity( entity ) ) {
		return [];
	}
	const inputs = [];
	inputConfig.forEach( ( config ) => {
		if (
			// if config id exists
			config.id &&
			// and input is not excluded from form
			indexOf( exclude, config.id ) < 0 && (
				// and input is either for a property other than the entity ID
				// OR it IS for the entity ID and the ID checks out okay
				config.id !== 'id' ||
				( config.id === 'id' && normalizeEntityId( entity.id ) )
			)
		) {
			const input = generateFormInputFromConfig(
				formDataKeyPrefix,
				formDataValues,
				config
			);
			if ( input ) {
				inputs.push( input );
			}
		}
	} );
	return inputs;
};
