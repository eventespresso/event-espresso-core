/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import * as eventModel from '../../../../data/model/event';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Select Component for the Event Model.
 */
export default class EventSelect extends Component {
	state = {
		modelName: 'event',
	};

	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Events.', 'event_espresso' ),
			noOptionsMessage: () => __(
				'There are no events available to select from.',
				'event_espresso',
			),
			placeholder: __( 'Select Event...', 'event_espresso' ),
		},
		...eventModel.defaultQueryData,
		getQueryString: eventModel.getQueryString,
		selectLabel: __( 'Select Event...', 'event_espresso' ),
	};

	static propTypes = {
		...eventModel.queryDataTypes,
		selectedEventId: PropTypes.number,
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
		};
		return <ModelSelect { ...props } />;
	}
}
