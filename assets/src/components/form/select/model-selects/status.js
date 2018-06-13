/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import * as statusModel from '../../../../data/model/status';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { PropTypes } from 'prop-types';

/**
 * Select Component for the Status Model.
 */
export default class StatusSelect extends Component {
	state = {
		modelName: 'status',
	};

	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Statuses.', 'event_espresso' ),
			noOptionsMessage: () => __( 'No Statuses.', 'event_espresso' ),
			placeholder: __( 'Select Status...', 'event_espresso' ),
		},
		...statusModel.defaultQueryData,
		getQueryString: statusModel.getQueryString,
		selectedType: 'registration',
		selectLabel: __( 'Select Status', 'event_espresso' ),
		addAllOptionLabel: __( 'All Statuses', 'event_espresso' ),
	};

	static propTypes = {
		...statusModel.queryDataTypes,
		selectedType: PropTypes.string.isRequired,
		selectedStatusId: PropTypes.string,
		onStatusSelect: PropTypes.func,
		selectLabel: PropTypes.string,
	};

	render() {
		const { selectedStatusId, onStatusSelect } = this.props;
		const selectOpts = {
			selectConfiguration: {
				defaultValue: selectedStatusId,
				onChange: onStatusSelect,
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

