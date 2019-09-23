/**
 * External imports
 */
import classNames from 'classnames';
import { parseInfinity } from '@eventespresso/utils';
import { InfinitySymbol } from '@eventespresso/value-objects';

/**
 * Internal imports
 */
import Spinner from './spinner';

/**
 * renders the input in edit mode
 *
 * @param {Object} props
 * @return {Object}	the rendered input
 */
export default ( {
	htmlId,
	value,
	type,
	valueType,
	label,
	inputProps,
	noticeStyle,
	onBlur,
	onInput,
	onKeyDown,
	saving,
	inputRef,
} ) => {
	let inputValue;
	if ( [ 'string', 'number' ].includes( typeof value ) ) {
		inputValue = value;
	} else if (
		'infinite' === valueType &&
		value.type === InfinitySymbol
	) {
		inputValue = parseInfinity( value.props.value );
	} else {
		inputValue = '';
	}
	inputValue = inputValue !== Infinity ? inputValue : '';
	const htmlClass = classNames(
		'ee-inline-input',
		'form-control',
		{
			'ee-inline-edit-input-number': valueType === 'number' ||
					valueType === 'infinite',
		},
	);
	const input = type === 'textarea' ? (
		<textarea
			{ ...inputProps }
			ref={ inputRef }
			id={ htmlId }
			className={ htmlClass }
			onBlur={ onBlur }
			onInput={ onInput }
			onKeyDown={ onKeyDown }
			defaultValue={ inputValue }
		/>
	) : (
		<input
			{ ...inputProps }
			ref={ inputRef }
			id={ htmlId }
			type={ type }
			className={ htmlClass }
			onBlur={ onBlur }
			onInput={ onInput }
			onKeyDown={ onKeyDown }
			defaultValue={ inputValue }
		/>
	);
	return label ? (
		<>
			<Spinner style={ noticeStyle } submitting={ saving } />
			<label
				htmlFor={ htmlId }
				className="ee-inline-edit-label"
			>
				{ label }
			</label>
			{ input }
		</>
	) : input;
};
