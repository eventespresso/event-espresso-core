/**
 * External imports
 */
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import { Component, createRef, Fragment } from '@wordpress/element';
import { ENTER, ESCAPE, SPACE } from '@wordpress/keycodes';
import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';

/**
 * Internal imports
 */
import './inline-edit-input.css';
import { SubmittingNotice } from '../base/submitting-notice';

/**
 * InlineEditInput
 * displays a text span that when clicked,
 * converts into a text input or textarea to allow the text to be edited
 *
 * @function
 * @param {Function} onChange    	callback for setting value
 * @param {string|number} value 	current value for input
 * @param {string} type 			text input (default) or textarea
 * @param {string} valueType 		data type for value
 */
export class InlineEditInput extends Component {
	static propTypes = {
		htmlId: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.object,
			PropTypes.string,
		] ).isRequired,
		type: PropTypes.string,
		label: PropTypes.string,
		valueType: PropTypes.string,
		valueFormatter: PropTypes.func,
		formatterSettings: PropTypes.object,
		noticeStyle: PropTypes.object,
	};

	static defaultProps = {
		type: '',
		valueType: 'string',
		valueFormatter: null,
		formatterSettings: {},
		noticeStyle: {},
		label: '',
	};

	constructor( props ) {
		super( props );
		this.input = createRef();
		this.state = { saving: false };
	}

	componentDidMount() {
		this.setState(
			{
				editing: false,
				origValue: this.props.value,
				value: this.props.value,
				onChange: this.props.onChange,
				saving: false,
			}
		);
	}

	/**
	 * used to detect changes and whether to focus the input or end editing
	 * @function
	 * @param {Object} prevProps
	 * @param {Object} prevState
	 */
	componentDidUpdate = async ( prevProps, prevState ) => {
		if (
			! prevProps.saving &&
			! this.state.saving &&
			typeof prevState.value !== 'undefined' &&
			prevState.value === this.state.value &&
			prevProps.value !== this.props.value
		) {
			// value was changed externally, so update it
			this.setState( {
				editing: this.props.value === '',
				value: this.props.value,
			} );
		} else if ( this.state.editing ) {
			if ( ! prevState.editing ) {
				// focus on input when editing begins
				this.input.current.focus();
			} else if ( prevProps.value !== this.props.value ) {
				// editing is complete
				await this.done();
			}
		}
	};

	/**
	 * sets editing mode to true
	 * @function
	 */
	edit = () => {
		this.setState( { editing: true } );
	};

	/**
	 * sets editing mode to false and reverts changes made to input value
	 * @function
	 */
	cancel = () => {
		this.setState( ( prevState ) => {
			return {
				editing: false,
				value: prevState.origValue,
			};
		} );
	};

	/**
	 * sets editing mode to false
	 * @function
	 */
	done = async () => {
		this.setState( { saving: true } );
		return Promise.resolve(
			await this.state.onChange( this.state.value )
		).then( () => {
			this.setState( {
				editing: this.state.value === '',
				saving: false,
			} );
		} );
	};

	/**
	 * detects keyboard commands to enter editing
	 * @function
	 * @param {Object} event
	 */
	keySelect = ( event ) => {
		if ( event.keyCode === ENTER || event.keyCode === SPACE ) {
			event.preventDefault();
			event.stopPropagation();
			this.edit();
		}
	};

	/**
	 * detects keyboard commands to exit editing
	 * @function
	 * @param {Object} event
	 */
	keyDownInput = async ( event ) => {
		if ( event.keyCode === ENTER ) {
			event.preventDefault();
			event.stopPropagation();
			await this.done();
		} else if ( event.keyCode === ESCAPE ) {
			event.preventDefault();
			event.stopPropagation();
			this.cancel();
		}
	};

	/**
	 * detects text changes and updates input value
	 * @function
	 * @param {Object} event
	 */
	textChange = ( event ) => {
		if (
			event &&
			event.target &&
			typeof event.target.value !== 'undefined'
		) {
			this.setState( { value: event.target.value } );
		}
	};

	/**
	 * renders the input in edit mode
	 * @param {string} htmlId 			input identifier
	 * @param {string|number} value 	current value for input
	 * @param {string} type 			text input or textarea
	 * @param {string} valueType 		data type for value
	 * @param {string} label 			displayed when editing
	 * @param {Object} inputProps		additional passed props
	 * @param {Object} noticeStyle
	 * @return {Object}					the rendered input
	 */
	editComponent = (
		htmlId,
		value,
		type,
		valueType,
		label,
		inputProps,
		noticeStyle
	) => {
		const inputValue = typeof this.state.value === 'string' ||
		typeof this.state.value === 'number' ?
			this.state.value :
			'';
		const htmlClass = classNames(
			'ee-inline-input',
			'form-control',
			{
				'ee-inline-edit-input-number': valueType === 'number',
			},
		);
		const input = type === 'textarea' ? (
			<textarea
				{ ...inputProps }
				ref={ this.input }
				id={ htmlId }
				className={ htmlClass }
				onBlur={ this.done }
				onInput={ this.textChange }
				onKeyDown={ this.keyDownInput }
				defaultValue={ inputValue }
			/>
		) : (
			<input
				{ ...inputProps }
				ref={ this.input }
				id={ htmlId }
				type={ type }
				className={ htmlClass }
				onBlur={ this.done }
				onInput={ this.textChange }
				onKeyDown={ this.keyDownInput }
				defaultValue={ inputValue }
			/>
		);
		return label ? (
			<Fragment>
				{ this.spinner( noticeStyle ) }
				<label
					htmlFor={ htmlId }
					className="ee-inline-edit-label"
				>
					{ label }
				</label>
				{ input }
			</Fragment>
		) : input;
	};

	/**
	 * renders the text in display mode
	 * @param {Function} valueFormatter formatting callback
	 * @param {Object} formatterSettings
	 * @return {Object} rendered span tag
	 * @param {Object} noticeStyle
	 */
	displayComponent = ( valueFormatter, formatterSettings, noticeStyle ) => {
		const value = isFunction( valueFormatter ) ?
			valueFormatter( this.state.value, formatterSettings ) :
			this.state.value;
		return (
			<Fragment>
				{ this.spinner( noticeStyle ) }
				<span
					role="button"
					tabIndex="0"
					onClick={ this.edit }
					onFocus={ this.edit }
					onKeyDown={ this.keySelect }
					className="ee-inline-edit-text clickable"
					aria-label={ __( 'click to edit', 'event_espresso' ) }
				>
					{ value }
				</span>
			</Fragment>
		);
	};

	/**
	 * @param {Object} noticeStyle
	 * @return {Object} rendered spinner
	 */
	spinner = ( noticeStyle ) => {
		return (
			<SubmittingNotice
				submitting={ this.state.saving }
				submittingText={ __( 'saving', 'event_espresso' ) }
				style={ noticeStyle }
			/>
		);
	};

	render() {
		const {
			htmlId,
			value,
			type,
			valueType,
			valueFormatter,
			formatterSettings,
			noticeStyle,
			label,
			...inputProps
		} = this.props;
		delete inputProps.onChange;
		return this.state.editing ?
			this.editComponent(
				htmlId,
				value,
				type,
				valueType,
				label,
				inputProps,
				noticeStyle
			) :
			this.displayComponent(
				valueFormatter,
				formatterSettings,
				noticeStyle,
			);
	}
}
