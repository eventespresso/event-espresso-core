/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Dropdown, IconButton } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { SERVER_LOCALE } from '@eventespresso/eejs';
import { DATE_TIME_FORMAT_SITE } from '@eventespresso/helpers';
import { useIs12HourTime } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';
import { ServerDateTime } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import './date-time-input.css';
import { DateTimePicker } from './date-time-picker';
import { EspressoIcon, ESPRESSO_ICON_CALENDAR } from '../../ui/image';

/**
 * Generates HTML5 text input that opens a WP Dropdown + DateTimePicker
 * for populating the input with a date and time
 *
 * @function
 * @param {Object} props
 */
const DateTimeDropdown = ( {
	input,
	htmlId,
	htmlClass,
	helpTextID,
	dataSet,
	inputWidth = '',
	isInvalidDate,
	...rest
} ) => {
	delete rest.initialValue;
	const [ inputValue, setInputValue ] = useState( new Date() );
	const is12HourTime = useIs12HourTime();

	useEffect( () => {
		const initialValue = input.value ?
			new Date( input.value ) :
			new Date();
		setInputValue( initialValue );
	}, [ input.value ] );

	const inputClass = classNames( {
		[ htmlClass ]: true,
		'ee-date-time-input-text-field': true,
		'form-control': true,
		[ `ee-input-width-${ inputWidth }` ]: inputWidth,
	} );
	const _inputValue = inputValue instanceof Date ?
		ServerDateTime.fromJSDate( inputValue ) :
		ServerDateTime.fromJSDate( new Date() );

	const onChangeHandler = ( newDate ) => {
		const value = new Date( newDate );

		setInputValue( value );

		const { onChange } = input;

		if ( typeof onChange === 'function' ) {
			onChange( value.toISOString() );
		}
	};

	return (
		<Dropdown
			position="bottom center"
			contentClassName="ee-date-time-input-dialog"
			renderToggle={ ( { onToggle } ) => (
				<div className={ 'ee-date-time-input-text-field-wrapper' }>
					<input
						type="text"
						id={ htmlId }
						className={ inputClass }
						value={ _inputValue.toFormat( DATE_TIME_FORMAT_SITE ) }
						onClick={ onToggle }
						onChange={ input.onChange }
						onKeyDown={ ( event ) => {
							if (
								event.keyCode === ENTER ||
								event.keyCode === SPACE
							) {
								onToggle( event );
							}
						} }
						aria-describedby={ helpTextID }
						aria-live="polite"
						{ ...dataSet }
						{ ...rest }
					/>
					<IconButton
						icon={
							<EspressoIcon
								icon={ ESPRESSO_ICON_CALENDAR }
								onClick={ onToggle }
							/>
						}
						label={ __(
							'Click to choose date and time',
							'event_espresso'
						) }
					/>
				</div>
			) }
			renderContent={ () => (
				<div className={ 'ee-date-time-input-picker-wrapper' } >
					<DateTimePicker
						key="ee-date-time-picker"
						currentDate={ inputValue }
						onChange={ onChangeHandler }
						locale={ SERVER_LOCALE }
						is12Hour={ is12HourTime }
						isInvalidDate={ isInvalidDate }
					/>
				</div>
			) }
		/>
	);
};

DateTimeDropdown.propTypes = {
	input: PropTypes.object.isRequired,
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
	inputWidth: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
};

/**
 * @function
 * @param {Object} attributes
 * @return {Object} rendered input
 */
const DateTimeInput = ( attributes ) => {
	return (
		<Field
			component={ DateTimeDropdown }
			{ ...attributes }
		/>
	);
};

export default DateTimeInput;
