/**
 * Internal imports
 */
import createModelSelect from '../base/create-model-select';
import { ticketModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

const optionsEntityMap = {
	default: {
		value: 'TKT_ID',
		label: 'TKT_name',
	},
};

const TicketSelect = createModelSelect(
	model.MODEL_NAME,
	{
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Tickets.', 'event_espresso' ),
			noOptionsMessage: () => __( 'No Tickets.', 'event_espresso' ),
			placeholder: __( 'Select Ticket...', 'event_espresso' ),
		},
		...model.defaultQueryData,
		getQueryString: model.getQueryString,
		label: __( 'Select Ticket', 'event_espresso' ),
		optionsEntityMap,
	},
	{
		...model.queryDataTypes,
		optionsEntityMap: PropTypes.object,
	}
);

export default TicketSelect;

/**
 * Enhanced Ticket Select for the WordPress editor
 */
export const EditorTicketSelect = withBaseControl(
	'select-ticket'
)( TicketSelect );
