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

export class EventSelect extends Component {
	state = {
		modelName: 'events',
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
	};

	static propTypes = {
		...eventModel.queryDataTypes,
	};

	render() {
		return <ModelSelect { ...this.props } { ...this.state } />;
	}
}
