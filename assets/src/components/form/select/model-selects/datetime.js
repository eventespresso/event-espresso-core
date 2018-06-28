/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import { dateTimeModel } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

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
		...dateTimeModel.defaultQueryData,
		getQueryString: dateTimeModel.getQueryString,
		selectLabel: __( 'Select Datetime', 'event_espresso' ),
	};

	static propTypes = {
		...dateTimeModel.queryDataTypes,
		forEventId: PropTypes.number,
		selectedDatetimeId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onDatetimeSelect: PropTypes.func,
		selectLabel: PropTypes.string,
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
