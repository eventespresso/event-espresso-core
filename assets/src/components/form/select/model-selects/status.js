/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import { statusModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { PropTypes } from 'prop-types';

const optionsEntityMap = {
	default: {
		value: 'STS_ID',
		label: 'STS_code',
	},
};

/**
 * Select Component for the Status Model.
 */
export default class StatusSelect extends Component {
	state = {
		modelName: model.MODEL_NAME,
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
		...model.defaultQueryData,
		getQueryString: model.getQueryString,
		label: __( 'Select Status', 'event_espresso' ),
		optionsEntityMap,
	};

	static propTypes = {
		...model.queryDataTypes,
		statusType: PropTypes.oneOf( [
			model.STATUS_TYPE_EMAIL,
			model.STATUS_TYPE_EVENT,
			model.STATUS_TYPE_MESSAGE,
			model.STATUS_TYPE_PAYMENT,
			model.STATUS_TYPE_REGISTRATION,
			model.STATUS_TYPE_TRANSACTION,
		] ).isRequired,
		selectedStatusId: PropTypes.oneOf(
			model.ALL_STATUS_IDS
		),
		onStatusSelect: PropTypes.func,
		label: PropTypes.string,
		optionsEntityMap: PropTypes.object,
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
		if ( this.props.statusType ) {
			this.addStatusTypeToQueryData( this.props.statusType );
		}
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
			optionsEntityMap,
		};
		return <ModelSelect { ...props } />;
	}
}

/**
 * Enhanced Status Select for the WordPress editor
 */
export const EditorStatusSelect = withBaseControl(
	'select-status'
)( StatusSelect );
