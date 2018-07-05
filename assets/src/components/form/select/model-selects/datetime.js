/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import { dateTimeModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { PropTypes } from 'prop-types';

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

/**
 * Select Component for the Datetime Model.
 */
export default class DatetimeSelect extends Component {
	state = {
		modelName: model.MODEL_NAME,
		queryData: {},
	};

	static defaultProps = {
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
		selectLabel: __( 'Select Datetime', 'event_espresso' ),
		optionsEntityMap,
	};

	static propTypes = {
		...model.queryDataTypes,
		forEventId: PropTypes.number,
		selectedDatetimeId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onDatetimeSelect: PropTypes.func,
		selectLabel: PropTypes.string,
		optionsEntityMap: PropTypes.object,
	};

	addEventIdToQueryData( forEventId ) {
		this.setState( {
			queryData: {
				...this.state.queryData,
				forEventId,
			},
		} );
	}

	componentDidMount() {
		this.setState( {
			queryData: { ...this.props.queryData },
		} );
		if ( this.props.forEventId > 0 ) {
			this.addEventIdToQueryData( this.props.forEventId );
		}
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.forEventId !== this.props.forEventId ) {
			this.addEventIdToQueryData( this.props.forEventId );
		}
	}

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
			optionsEntityMap,
		};
		return <ModelSelect { ...props } />;
	}
}

/**
 * Enhanced Datetime Select for the WordPress editor
 */
export const EditorDatetimeSelect = withBaseControl(
	'select-datetime'
)( DatetimeSelect );
