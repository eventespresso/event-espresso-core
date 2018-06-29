/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import { ticketModel as model } from '../../../../data/model';
import { withBaseControl } from '../../../../higher-order-components';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { PropTypes } from 'prop-types';

const optionsEntityMap = {
	default: {
		value: 'TKT_ID',
		label: 'TKT_name',
	},
};

/**
 * Select Component for the Ticket Model.
 */
export default class TicketSelect extends Component {
	state = {
		modelName: model.MODEL_NAME,
		queryData: {},
	};

	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Tickets.', 'event_espresso' ),
			noOptionsMessage: () => __( 'No Tickets.', 'event_espresso' ),
			placeholder: __( 'Select Ticket...', 'event_espresso' ),
		},
		...model.defaultQueryData,
		getQueryString: model.getQueryString,
		selectLabel: __( 'Select Ticket', 'event_espresso' ),
		optionsEntityMap,
	};

	static propTypes = {
		...model.queryDataTypes,
		forEventId: PropTypes.number,
		forDatetimeId: PropTypes.number,
		selectedTicketId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onTicketSelect: PropTypes.func,
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

	addDatetimeIdToQueryData( forDatetimeId ) {
		this.setState( {
			queryData: {
				...this.state.queryData,
				forDatetimeId,
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
		if ( this.props.forDatetimeId > 0 ) {
			this.addDatetimeIdToQueryData( this.props.forDatetimeId );
		}
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.forEventId !== this.props.forEventId ) {
			this.addEventIdToQueryData( this.props.forEventId );
		}
		if ( prevProps.forDatetimeId !== this.props.forDatetimeId ) {
			this.addDatetimeIdToQueryData( this.props.forDatetimeId );
		}
	}

	render() {
		const { selectedTicketId, onTicketSelect } = this.props;
		const selectOpts = {
			selectConfiguration: {
				defaultValue: selectedTicketId,
				onChange: onTicketSelect,
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
 * Enhanced Ticket Select for the WordPress editor
 */
export const EditorTicketSelect = withBaseControl(
	'select-ticket'
)( TicketSelect );
