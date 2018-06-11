/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import * as datetimeModel from '../../../../data/model/datetime';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { PropTypes } from 'prop-types';

/**
 * Select Component for the Datetime Model.
 */
export default class DatetimeSelect extends Component {
	state = {
		modelName: 'datetime',
	};

	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Datetimes.', 'event_espresso' ),
			noOptionsMessage: () => __(
				'There are no datetimes available to select from.',
				'event_espresso',
			),
			placeholder: __( 'Select Datetime...', 'event_espresso' ),
		},
		...datetimeModel.defaultQueryData,
		getQueryString: datetimeModel.getQueryString,
		selectLabel: __( 'Select Datetime', 'event_espresso' ),
		addAllOptionLabel: __( 'All Datetimes', 'event_espresso' ),
	};

	static propTypes = {
		...datetimeModel.queryDataTypes,
		forEventId: PropTypes.number,
		selectedDatetimeId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onDatetimeSelect: PropTypes.func,
		selectLabel: PropTypes.string,
	};

	render() {
		const { selectedDatetimeId, onDatetimeSelect } = this.props;
		const selectOpts = {
			selectConfiguration: {
				defaultValue: selectedDatetimeId,
				onChange: onDatetimeSelect,
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
