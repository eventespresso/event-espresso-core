/**
 * External imports
 */
import { upperFirst, camelCase } from 'lodash';

/**
 * Return a name for a model select component.
 *
 * @param {string} modelName
 * @return {string} Receives something like 'message_template' and returns
 * MessageTemplateSelect
 */
export const modelSelectName = ( modelName ) => {
	return upperFirst( camelCase( modelName ) ) + 'Select';
};
