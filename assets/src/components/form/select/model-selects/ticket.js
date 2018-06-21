/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import { ticketModel } from '../../../../data/model';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { PropTypes } from 'prop-types';

/**
 * Select Component for the Ticket Model.
 */
export default class TicketSelect extends Component {
	state = {
		modelName: 'ticket',
		queryData: {},
	};

	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Tickets.', 'event_espresso' ),
			noOptionsMessage: () => __( 'No Tickets.', 'event_espresso' ),
			placeholder: __( 'Select Ticket...', 'event_espresso' ),
		},
		...ticketModel.defaultQueryData,
		getQueryString: ticketModel.getQueryString,
		selectLabel: __( 'Select Ticket', 'event_espresso' ),
		addAllOptionLabel: __( 'All Tickets', 'event_espresso' ),
	};

	static propTypes = {
		...ticketModel.queryDataTypes,
		forEventId: PropTypes.number,
		forDatetimeId: PropTypes.number,
		selectedTicketId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onTicketSelect: PropTypes.func,
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
