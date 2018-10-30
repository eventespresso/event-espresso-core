/**
 * External imports
 */
import { applyFilters } from '@wordpress/hooks';
import { isUndefined } from 'lodash';

/**
 * Constants describing the current "save state" for an entity.
 *
 * @type {{CLEAN: Symbol, NEW: Symbol, DIRTY: Symbol}}
 */
export const SAVE_STATE = {
	CLEAN: Symbol( 'Entity is persisted.' ),
	NEW: Symbol( 'Entity is new.' ),
	DIRTY: Symbol( 'Existing entity has changes and needs persisted.' ),
};

/**
 * Validation types are for schema's that have value variations.
 * @type {{RAW: string, RENDERED: string, PRETTY: string}}
 */
export const VALIDATE_TYPE = {
	RAW: 'raw',
	RENDERED: 'rendered',
	PRETTY: 'pretty',
};

/**
 * Private properties used internally by the Base Entity Class
 * @type {{saveState: boolean}}
 */
export const PRIVATE_PROPERTIES = {
	SAVE_STATE: Symbol( 'baseEntityPrivatePropertiesSaveState' ),
	VALIDATE_TYPES: Symbol( 'baseEntityPrivatePropertiesValidateTypes' ),
};

/**
 * Hardcoded list of model prefixes for fields on models.

 * A model prefix is something that "namespaces" a field on a model.  For
 * example, if the field is "EVT_ID", then the prefix is "EVT"; if the field is
 * "DTT_EVT_start", then the prefixes are "DTT", and "DTT_EVT".
 *
 * @param  {string} modelName
 * @return {Object} A filtered object indexed by model name and the values are
 * an array of model prefixes for that model.
 */
export const MODEL_PREFIXES = ( modelName ) => {
	const prefixMap = applyFilters(
		'FHEE__ENTITY_FACTORY__CONSTANTS__MODEL_PREFIXES',
		{
			answer: [ 'ANS' ],
			attendee: [ 'ATT' ],
			change_log: [ 'LOG' ],
			checkin: [ 'CHK' ],
			country: [ 'CNT' ],
			currency: [ 'CUR' ],
			currency_payment_method: [ 'CPM' ],
			datetime: [ 'DTT', 'DTT_EVT' ],
			datetime_ticket: [ 'DTK' ],
			event: [ 'EVT' ],
			event_message_template: [ 'EMT' ],
			event_question_group: [ 'EQG' ],
			event_venue: [ 'EVV' ],
			extra_join: [ 'EXJ' ],
			extra_meta: [ 'EXM' ],
			line_item: [ 'LIN' ],
			message: [ 'MSG' ],
			message_template: [ 'MTP' ],
			message_template_group: [ 'GRP', 'MTP' ],
			payment: [ 'PAY' ],
			payment_method: [ 'PMD' ],
			post_meta: [ 'meta' ],
			price: [ 'PRC' ],
			price_type: [ 'PRT' ],
			question: [ 'QST' ],
			question_group: [ 'QSG' ],
			question_group_question: [ 'QGQ' ],
			question_option: [ 'QSO' ],
			registration: [ 'REG' ],
			registration_payment: [ 'RPY' ],
			state: [ 'STA' ],
			status: [ 'STS' ],
			term: [ 'term' ],
			term_relationship: [],
			term_taxonomy: [ 'term_taxonomy' ],
			ticket: [ 'TKT' ],
			ticket_price: [ 'TKP' ],
			ticket_template: [ 'TTM' ],
			transaction: [ 'TXN' ],
			venue: [ 'VNU' ],
			wp_user: [ 'user' ],
		} );
	return ! isUndefined( prefixMap[ modelName ] ) ?
		prefixMap[ modelName ] :
		[];
};
