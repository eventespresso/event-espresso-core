/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import { statusModel } from '../../../../data/model';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { default as EditorSelect, getEditorSelectProps } from './editor-select';
import { PropTypes } from 'prop-types';

/**
 * Select Component for the Status Model.
 */
export default class StatusSelect extends Component {
	state = {
		modelName: statusModel.MODEL_NAME,
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
			optionsEntityMap: statusModel.optionsEntityMap,
		};
		return <ModelSelect { ...props } />;
	}
}

/**
 * Select Component for the Status Model wrapped in a BaseControl component.
 */
export class EditorStatusSelect extends Component {
	static defaultProps = {
		selectLabel: __( 'Select Status', 'event_espresso' ),
	};
	static propTypes = {
		selectLabel: PropTypes.string,
	};

	render() {
		const props = { ...this.props };
		props.modelName = statusModel.MODEL_NAME;
		const { editorProps, selectProps } = getEditorSelectProps( props );
		return (
			<EditorSelect { ...editorProps } >
				<StatusSelect { ...selectProps } />
			</EditorSelect>
		);
	}
}
