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
		queryData: {},
	};

	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Statuses.',
				'event_espresso',
			),
			noOptionsMessage: () => __( 'No Statuses.', 'event_espresso' ),
			placeholder: __( 'Select Status...', 'event_espresso' ),
		},
		...statusModel.defaultQueryData,
		getQueryString: statusModel.getQueryString,
		selectLabel: __( 'Select Status', 'event_espresso' ),
		addAllOptionLabel: __( 'All Statuses', 'event_espresso' ),
	};

	static propTypes = {
		...statusModel.queryDataTypes,
		statusType: PropTypes.oneOf( [
			statusModel.STATUS_TYPE_EMAIL,
			statusModel.STATUS_TYPE_EVENT,
			statusModel.STATUS_TYPE_MESSAGE,
			statusModel.STATUS_TYPE_PAYMENT,
			statusModel.STATUS_TYPE_REGISTRATION,
			statusModel.STATUS_TYPE_TRANSACTION,
		] ).isRequired,
		selectedStatusId: PropTypes.string,
		onStatusSelect: PropTypes.func,
		selectLabel: PropTypes.string,
	};

	addStatusTypeToQueryData( statusType ) {
		this.setState( {
			queryData: {
				...this.state.queryData,
				statusType,
			},
		} );
	}

	componentDidMount() {
		this.setState( {
			queryData: { ...this.props.queryData },
		} );
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.statusType !== this.props.statusType ) {
			this.addStatusTypeToQueryData( this.props.statusType );
		}
	}

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

