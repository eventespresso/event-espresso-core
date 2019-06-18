/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { Field } from 'react-final-form';
import {
	Button,
	DateTimePicker,
	Dropdown,
	IconButton,
} from '@wordpress/components';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { EspressoIcon, ESPRESSO_ICON_CALENDAR } from '../../ui/image/espresso-icon';
import { SERVER_LOCALE } from '@eventespresso/eejs';
import { DATE_TIME_FORMAT_SITE, TIME_FORMAT_SITE } from '@eventespresso/helpers';
import { __ } from '@eventespresso/i18n';
import { ServerDateTime } from '@eventespresso/value-objects';

import './date-time-input.css';
/**
 * generates an HTML5 text input that opens a WP Dropdown + DateTimePicker
 * for populating the input with a date and time
 *
 * @function
 * @param {Object} input
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {number|string} inputWidth
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
class DateTimeDropdown extends Component {
	static propTypes = {
		input: PropTypes.object.isRequired,
		initialValue: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.string,
		] ).isRequired,
		htmlId: PropTypes.string.isRequired,
		htmlClass: PropTypes.string,
		helpTextID: PropTypes.string,
		dataSet: PropTypes.object,
		inputWidth: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
	};

	constructor( props ) {
		super( props );
		const initialValue = new Date();
		this.state = {
			is12HourTime: true,
			editorOpen: false,
			inputValue: initialValue,
			newValue: initialValue,
			prevValue: initialValue,
			onChange: null,
		};
	}

	/**
	 * opens and closes DateTimePicker Modal
	 *
	 * @function
	 */
	componentDidMount = () => {
		const initialValue = this.props.initialValue ?
			new Date( this.props.initialValue ) :
			new Date();
		// To know if the current timezone is a 12 hour time
		// we look for "a" in the time format
		// We also make sure this a is not escaped by a "/"
		const is12HourTime = /a(?!\\)/i.test(
			TIME_FORMAT_SITE
			// Test only the lower case a
				.toLowerCase()
				// Replace "//" with empty strings
				.replace( /\\\\/g, '' )
				// Reverse the string and test for "a" not followed by a slash
				.split( '' ).reverse().join( '' )
		);
		this.setState( {
			is12HourTime,
			editorOpen: false,
			inputValue: initialValue,
			newValue: initialValue,
			prevValue: initialValue,
			onChange: this.props.input && this.props.input.onChange ?
				this.props.input.onChange :
				null,
		} );
	};

	/**
	 * opens and closes DateTimePicker Modal
	 *
	 * @function
	 */
	toggleEditor = () => {
		this.setState( ( prevState ) => (
			{ editorOpen: ! prevState.editorOpen }
		) );
	};

	/**
	 * opens and closes DateTimePicker Modal
	 *
	 * @function
	 * @param {string} newDate
	 */
	onChange = ( newDate ) => {
		this.setState( { newValue: new Date( newDate ) } );
	};

	/**
	 * opens and closes DateTimePicker Modal
	 *
	 * @function
	 */
	cancel = () => {
		this.setState( ( prevState ) => (
			{ inputValue: prevState.prevValue }
		) );
	};

	/**
	 * submits the value from the Datepicker
	 *
	 * @function
	 */
	update = () => {
		this.setState( ( prevState ) => {
			if ( typeof prevState.onChange === 'function' ) {
				prevState.onChange( prevState.newValue.toISOString() );
			}
			return {
				inputValue: prevState.newValue,
				prevValue: prevState.newValue,
			};
		} );
	};

	render() {
		const {
			input,
			htmlId,
			htmlClass,
			helpTextID,
			dataSet,
			inputWidth = '',
			...attributes
		} = this.props;
		delete attributes.initialValue;
		const inputClass = classNames( {
			[ htmlClass ]: true,
			'ee-date-time-input-text-field': true,
			'form-control': true,
			[ `ee-input-width-${ inputWidth }` ]: inputWidth,
		} );
		const inputValue = ServerDateTime.fromJSDate( this.state.inputValue );
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
							value={ inputValue.toFormat( DATE_TIME_FORMAT_SITE ) }
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
							{ ...attributes }
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
				renderContent={ ( { onToggle } ) => (
					<div className={ 'ee-date-time-input-picker-wrapper' } >
						<DateTimePicker
							key="ee-date-time-picker"
							currentDate={ this.state.newValue }
							onChange={ this.onChange }
							locale={ SERVER_LOCALE }
							is12Hour={ this.state.is12HourTime }
						/>
						<div className={ 'ee-date-time-input-buttons-wrapper' } >
							<Button isPrimary
								onClick={ () => {
									this.update();
									onToggle();
								} }
								className="ee-form-button-submit ee-form-button"
							>
								{ __( 'Submit', 'event_espresso' ) }
							</Button>
							<Button isDefault
								onClick={ () => {
									this.cancel();
									onToggle();
								} }
								className="ee-form-button-submit ee-form-button"
							>
								{ __( 'Cancel', 'event_espresso' ) }
							</Button>
						</div>
					</div>
				) }
			/>
		);
	}
}

/**
 * @function
 * @param {Object} attributes
 * @return {Object} rendered input
 */
export const DateTimeInput = ( attributes ) => {
	return (
		<Field
			component={ DateTimeDropdown }
			{ ...attributes }
		/>
	);
};
