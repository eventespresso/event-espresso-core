/**
 * Internal imports
 */
import ModelSelect from '../model-select';
import * as eventModel from '../../../../data/model/event';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Component } from '@wordpress/element';
import { default as EditorSelect, getEditorSelectProps } from './editor-select';
import { PropTypes } from 'prop-types';

/**
 * Select Component for the Event Model.
 */
export default class EventSelect extends Component {
	state = {
		modelName: 'event',
	};

	static defaultProps = {
		selectConfiguration: {
			loadingMessage: () => __( 'Retrieving Events.', 'event_espresso' ),
			noOptionsMessage: () => __(
				'No Events.',
				'event_espresso',
			),
			placeholder: __( 'Select Event...', 'event_espresso' ),
		},
		...eventModel.defaultQueryData,
		getQueryString: eventModel.getQueryString,
		selectLabel: __( 'Select Event', 'event_espresso' ),
	};

	static propTypes = {
		...eventModel.queryDataTypes,
		selectedEventId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onEventSelect: PropTypes.func,
		selectLabel: PropTypes.string,
	};

	render() {
		const { selectedEventId, onEventSelect } = this.props;
		const selectOpts = {
			selectConfiguration: {
				defaultValue: selectedEventId,
				onChange: onEventSelect,
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
 * EventSelect Component wrapped in a BaseControl component.
 */
export class EditorEventSelect extends Component {
	static defaultProps = {
		selectLabel: __( 'Select Event', 'event_espresso' ),
	};
	static propTypes = {
		selectLabel: PropTypes.string,
	};
	render() {
		const props = { ...this.props };
		const { editorProps, ...selectProps } = getEditorSelectProps( props );
		return (
			<EditorSelect { ...editorProps } >
				<EventSelect { ...selectProps } />
			</EditorSelect>
		);
	}
}

