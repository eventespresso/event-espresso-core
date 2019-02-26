/**
 * External imports
 */
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Component } from '@wordpress/element';
import { Field } from 'react-final-form';
import { getSettings } from '@wordpress/date';
import { Button, DateTimePicker, Dropdown } from '@wordpress/components';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { __ } from '@eventespresso/i18n';

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
		this.state = {
			editorOpen: false,
			inputValue: props.initialValue ? props.initialValue : '',
			newValue: props.initialValue ? props.initialValue : '',
			prevValue: props.initialValue ? props.initialValue : '',
			onChange: props.input && props.input.onChange ?
				props.input.onChange :
				null,
		};
	}

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
		this.setState( { newValue: newDate } );
	};

	/**
	 * opens and closes DateTimePicker Modal
	 *
	 * @function
	 * @param {string} newDate
	 */
	cancel = () => {
		this.setState( ( prevState ) => (
			{ inputValue: prevState.prevValue }
		) );
	};

	/**
	 * opens and closes DateTimePicker Modal
	 *
	 * @function
	 * @param {string} newDate
	 */
	update = () => {
		this.setState( ( prevState ) => {
			prevState.onChange( prevState.newValue );
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
			helpTextID,
			dataSet,
			inputWidth = '',
			...attributes
		} = this.props;
		delete attributes.htmlClass;
		delete attributes.initialValue;
		let {
			htmlClass,
		} = this.props;
		htmlClass = inputWidth ?
			`${ htmlClass } ee-input-width-${ inputWidth }` :
			htmlClass;
		const settings = getSettings();
		// To know if the current timezone is a 12 hour time
		// we look for "a" in the time format
		// We also make sure this a is not escaped by a "/"
		const is12HourTime = /a(?!\\)/i.test(
			settings.formats.time
			// Test only the lower case a
				.toLowerCase()
				// Replace "//" with empty strings
				.replace( /\\\\/g, '' )
				// Reverse the string and test for "a" not followed by a slash
				.split( '' ).reverse().join( '' )
		);
		let inputValue = moment( this.state.inputValue );
		inputValue = inputValue.format( 'YYYY-MM-DD HH:mm A' );
		return (
			<Dropdown
				position="bottom center"
				contentClassName="ee-date-time-input-dialog"
				renderToggle={ ( { onToggle } ) => (
					<input
						type="text"
						id={ htmlId }
						className={ `${ htmlClass } form-control` }
						value={ inputValue }
						onChange={ input.onChange }
						onClick={ onToggle }
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
				) }
				renderContent={ ( { onToggle } ) => (
					<div style={ { padding: '1rem 2rem 2rem' } }>
						<DateTimePicker
							key="ee-date-time-picker"
							currentDate={ this.state.newValue }
							onChange={ this.onChange }
							locale={ settings.l10n.locale }
							is12Hour={ is12HourTime }
						/>
						<div
							style={ {
								padding: '2rem 0 0',
								textAlign: 'right',
							} }
						>
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
