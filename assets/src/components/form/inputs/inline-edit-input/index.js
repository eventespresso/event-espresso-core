/**
 * External imports
 */
import { useState, useEffect, useRef } from '@wordpress/element';
import { ENTER, ESCAPE, SPACE } from '@wordpress/keycodes';
import { usePrevious } from '@eventespresso/hooks';

/**
 * Internal imports
 */
import './style.css';
import Edit from './edit';
import Display from './display';

/**
 * InlineEditInput
 * displays a text span that when clicked,
 * converts into a text input or textarea to allow the text to be edited
 *
 * @function
 * @param {Object} props    	callback for setting value
 * @return {Object} - The rendered input
 */
export const InlineEditInput = ( {
	htmlId,
	value: inputValue,
	onChange,
	type,
	valueType,
	valueFormatter,
	formatterSettings,
	noticeStyle,
	label,
	...inputProps
} ) => {
	const [ editing, setEditing ] = useState( false );
	const [ origValue, setOrigValue ] = useState( null );
	const [ value, setValue ] = useState( inputValue );
	const [ saving, setSaving ] = useState( false );

	const inputRef = useRef( null );

	const prevState = usePrevious( { value, inputValue, saving, editing } );

	useEffect( () => {
		setOrigValue( inputValue );
	}, [] );

	const externalUpdate = async () => {
		if (
			! saving &&
			prevState &&
			typeof prevState.value !== 'undefined' &&
			prevState.value === value &&
			prevState.inputValue !== inputValue
		) {
			// value was changed externally, so update it
			setEditing( '' === inputValue );
			setValue( inputValue );
		} else if ( editing ) {
			if ( prevState && ! prevState.editing ) {
				// focus on input when editing begins
				inputRef.current.focus();
			} else if ( ! prevState || prevState.inputValue !== inputValue ) {
				// editing is complete
				await done();
			}
		}
	};

	useEffect( () => {
		externalUpdate();
	}, [ value, inputValue, saving, editing ] );

	/**
	 * sets editing mode to false
	 *
	 * @function
	 */
	const done = async () => {
		setSaving( true );
		let _value;
		return Promise.resolve(
			_value = await onChange( value )
		).then( () => {
			setValue( _value );
		} ).finally( () => {
			setEditing( false );
			setSaving( false );
		} );
	};

	/**
	 * sets editing mode to false and reverts changes made to input value
	 *
	 * @function
	 */
	const cancel = () => {
		setEditing( false );
		setValue( origValue );
	};

	/**
	 * sets editing mode to true
	 *
	 * @function
	 */
	const edit = () => {
		setEditing( true );
	};

	/**
	 * detects text changes and updates input value
	 *
	 * @function
	 * @param {Object} event
	 */
	const textChange = ( event = {} ) => {
		const { target: { value: _value } = {} } = event;
		if ( 'undefined' !== typeof _value ) {
			setValue( _value );
		}
	};

	/**
	 * detects keyboard commands to exit editing
	 *
	 * @function
	 * @param {Object} event
	 */
	const keyDownInput = async ( event ) => {
		if ( event.keyCode === ENTER ) {
			event.preventDefault();
			event.stopPropagation();
			await done();
		} else if ( event.keyCode === ESCAPE ) {
			event.preventDefault();
			event.stopPropagation();
			cancel();
		}
	};

	/**
	 * detects keyboard commands to enter editing
	 *
	 * @function
	 * @param {Object} event
	 */
	const keySelect = ( event ) => {
		if ( event.keyCode === ENTER || event.keyCode === SPACE ) {
			event.preventDefault();
			event.stopPropagation();
			edit();
		}
	};

	return editing ?
		<Edit
			onBlur={ done }
			onInput={ textChange }
			onKeyDown={ keyDownInput }
			saving={ saving }
			inputRef={ inputRef }
			{ ...{
				htmlId,
				value,
				type,
				valueType,
				label,
				inputProps,
				noticeStyle,
			} }
		/> :
		<Display
			onEdit={ edit }
			onKeyDown={ keySelect }
			{ ...{
				value,
				valueType,
				valueFormatter,
				formatterSettings,
				noticeStyle,
			} }
		/>;
};
