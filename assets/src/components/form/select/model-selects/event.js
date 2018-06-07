/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import * as eventModel from '../../../../data/model/event';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component, Fragment } from '@wordpress/element';

export class EventSelect extends Component {
	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Events.', 'event_espresso' ),
			noOptionsMessage: () => __(
				'There are no events available to select from.',
				'event_espresso',
			),
			placeholder: __( 'Select Event...', 'event_espresso' ),
		},
		modelName: 'event',
		...eventModel.defaultQueryData,
		getQueryString: eventModel.getQueryString,
	};

	static propTypes = {
		...eventModel.queryDataTypes,
	};

	render() {
		return (
			<Fragment>
				<ModelSelect { ...this.props } />
			</Fragment>
		);
	}
}
