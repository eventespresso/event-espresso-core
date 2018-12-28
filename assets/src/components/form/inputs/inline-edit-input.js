/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component, createRef } from 'react';
import { ENTER, ESCAPE, SPACE } from '@wordpress/keycodes';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import './inline-edit-input.css';

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
		onChange: PropTypes.func.isRequired,
		value: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.object,
			PropTypes.string,
		] ).isRequired,
		type: PropTypes.string,
		valueType: PropTypes.string,
	};

	constructor( props ) {
		super( props );
		this.input = createRef();
		this.state = {
			editing: false,
			origValue: props.value,
			value: props.value,
		};
	}

	/**
	 * used to detect changes and whether to focus the input or end editing
	 * @function
	 * @param {Object} prevProps
	 * @param {Object} prevState
	 */
	componentDidUpdate = ( prevProps, prevState ) => {
		if ( this.state.editing && ! prevState.editing ) {
			this.input.current.focus();
		} else if (
			this.state.editing &&
			prevProps.value !== this.props.value
		) {
			this.done();
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
	done = () => {
		this.setState( { editing: false } );
	};

	/**
	 * detects keyboard commands to enter editing
	 * @function
	 * @param {Object} event
	 */
	keySelect = event => {
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
	keyDownInput = event => {
		if ( event.keyCode === ENTER ) {
			event.preventDefault();
			event.stopPropagation();
			this.done();
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
	textChange = event => {
		if ( event && event.target && event.target.value ) {
			this.setState( { value: event.target.value } );
		}
	};

	/**
	 * renders the input in edit mode
	 * @param {string|number} value 	current value for input
	 * @param {string} type 			text input or textarea
	 * @param {string} valueType 		data type for value
	 * @param {Object} inputProps		additional passed props
	 * @return {Object}					the rendered input
	 */
	editComponent = ( value, type, valueType, inputProps ) => {
		const inputValue = typeof this.state.value === 'string' ||
		typeof this.state.value === 'number' ?
			this.state.value :
			'';
		delete inputProps.value;
		const htmlClass = valueType === 'number' ?
			'ee-inline-edit-input ee-inline-edit-input-number' :
			'ee-inline-edit-input';

		return type === 'textarea' ? (
			<textarea
				ref={ this.input }
				className={ htmlClass }
				onBlur={ this.done }
				onInput={ this.textChange }
				onKeyDown={ this.keyDownInput }
				value={ inputValue }
				aria-label={ __( 'click to edit', 'event_espresso' ) }
				{ ...inputProps }
			/>
		) : (
			<input
				ref={ this.input }
				type={ type }
				className={ htmlClass }
				onBlur={ this.done }
				onInput={ this.textChange }
				onKeyDown={ this.keyDownInput }
				value={ inputValue }
				aria-label={ __( 'click to edit', 'event_espresso' ) }
				{ ...inputProps }
			/>
		);
	};

	/**
	 * renders the text in display mode
	 * @return {Object} rendered span tag
	 */
	displayComponent = () => {
		return (
			<span
				role="button"
				tabIndex="0"
				onClick={ this.edit }
				onFocus={ this.edit }
				onKeyDown={ this.keySelect }
				className="ee-inline-edit-text clickable"
			>
				{ this.state.value }
			</span>
		);
	};

	render() {
		const {
			value,
			type = 'text',
			valueType = 'string',
			...inputProps
		} = this.props;
		if ( this.state.editing ) {
			return this.editComponent( value, type, valueType, inputProps );
		}
		return this.displayComponent();
	}
}
