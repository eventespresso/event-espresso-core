/**
 * Internal imports
 */
import createModelSelect from '../base/create-model-select';
import { dateTimeModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

const optionsEntityMap = {
	default: {
		value: 'DTT_ID',
		label: ( entity ) => {
			return model.prettyDateFromDateTime( entity );
		},
	},
	name: {
		value: 'DTT_ID',
		label: 'DTT_name',
	},
};

const DatetimeSelect = createModelSelect(
	model.MODEL_NAMES.MODEL,
	{
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Datetimes.', 'event_espresso' ),
			noOptionsMessage: () => __(
				'No Datetimes.',
				'event_espresso',
			),
			placeholder: __( 'Select Datetime...', 'event_espresso' ),
		},
		...model.defaultQueryData,
		getQueryString: model.getQueryString,
		label: __( 'Select Datetime', 'event_espresso' ),
		optionsEntityMap,
	},
	{
		...model.queryDataTypes,
		optionsEntityMap: PropTypes.object,
	}
);

export default DatetimeSelect;

/**
 * Enhanced Datetime Select for the WordPress editor
 */
export const EditorDatetimeSelect = withBaseControl(
	'select-datetime'
)( DatetimeSelect );
