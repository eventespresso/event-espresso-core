/**
 * Internal imports
 */
import createModelSelect from '../base/create-model-select';
import { statusModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';
import { statusModel } from '@eventespresso/model';

const optionsEntityMap = {
	default: {
		value: 'STS_ID',
		label: ( statusEntity ) => statusModel.prettyStatus(
			statusEntity.STS_ID
		),
	},
};

/**
 * @type {ModelSelectComponent}
 */
const StatusSelect = createModelSelect(
	model.MODEL_NAME,
	{
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Statuses.',
				'event_espresso',
			),
			noOptionsMessage: () => __( 'No Statuses.', 'event_espresso' ),
			placeholder: __( 'Select Status...', 'event_espresso' ),
		},
		...model.defaultQueryData,
		getQueryString: model.getQueryString,
		label: __( 'Select Status', 'event_espresso' ),
		optionsEntityMap,
	},
	{
		...model.queryDataTypes,
		selected: PropTypes.oneOf(
			model.ALL_STATUS_IDS
		),
		optionsEntityMap: PropTypes.object,
	},
);

export default StatusSelect;

/**
 * Enhanced Status Select for the WordPress editor
 */
export const EditorStatusSelect = withBaseControl(
	'select-status'
)( StatusSelect );
