/**
 * Internal imports
 */
import createModelSelect from '../base/create-model-select';
import { eventModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';

const optionsEntityMap = {
	default: {
		value: 'EVT_ID',
		label: 'EVT_name',
	},
};

const EventSelect = createModelSelect(
	model.MODEL_NAME,
	{
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Events.', 'event_espresso' ),
			noOptionsMessage: () => __(
				'No Events.',
				'event_espresso',
			),
			placeholder: __( 'Select Event...', 'event_espresso' ),
		},
		...model.defaultQueryData,
		getQueryString: model.getQueryString,
		label: __( 'Select Event', 'event_espresso' ),
		optionsEntityMap,
	},
	{
		...model.queryDataTypes,
	}
);

export default EventSelect;

/**
 * Enhanced EventSelect for the WordPress editor.
 */
export const EditorEventSelect = withBaseControl(
	'select-event'
)( EventSelect );
