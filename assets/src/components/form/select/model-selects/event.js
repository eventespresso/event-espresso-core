/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import { eventModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { PropTypes } from 'prop-types';

const optionsEntityMap = {
	default: {
		value: 'EVT_ID',
		label: 'EVT_name',
	},
};

/**
 * Select Component for the Event Model.
 */
export default class EventSelect extends Component {
	state = {
		modelName: model.MODEL_NAME,
	};

	static defaultProps = {
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
		selectLabel: __( 'Select Event', 'event_espresso' ),
		optionsEntityMap,
	};

	static propTypes = {
		...model.queryDataTypes,
		selectedEventId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onEventSelect: PropTypes.func,
		selectLabel: PropTypes.string,
	};

	render() {
		const { selectedEventId, onEventSelect } = this.props;
		const selectOpts = {
			selectConfiguration: {
				defaultValue: selectedEventId,
				onChange: onEventSelect,
				...this.props.selectConfiguration,
			},
		};
		const props = {
			...this.props,
			...selectOpts,
			...this.state,
			optionsEntityMap,
		};
		return <ModelSelect { ...props } />;
	}
}

/**
 * Enhanced EventSelect for the WordPress editor.
 */
export const EditorEventSelect = withBaseControl(
	'select-event'
)( EventSelect );
