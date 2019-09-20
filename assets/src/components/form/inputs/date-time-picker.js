/**
 * External dependencies
 */
// Needed to initialise the default datepicker styles.
// See: https://github.com/airbnb/react-dates#initialize
import 'react-dates/initialize';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { Button, DatePicker, TimePicker } from '@wordpress/components';

export const DateTimePicker = ( {
	currentDate,
	is12Hour,
	isInvalidDate,
	onChange,
} ) => {
	const [ calendarHelpIsVisible, setCalendarHelpIsVisible ] = useState( false );

	const toggleHelp = () => setCalendarHelpIsVisible( ! calendarHelpIsVisible );

	return (
		<div className="components-datetime">
			{ ! calendarHelpIsVisible && (
				<>
					<TimePicker
						currentTime={ currentDate }
						onChange={ onChange }
						is12Hour={ is12Hour }
					/>
					<DatePicker
						currentDate={ currentDate }
						onChange={ onChange }
						isInvalidDate={ isInvalidDate }
					/>
				</>
			) }

			{ calendarHelpIsVisible && (
				<>
					<div className="components-datetime__calendar-help">
						<h4>{ __( 'Click to Select', 'event_espresso' ) }</h4>
						<ul>
							<li>{ __( 'Click the right or left arrows to select other months in the past or the future.', 'event_espresso' ) }</li>
							<li>{ __( 'Click the desired day to select it.', 'event_espresso' ) }</li>
						</ul>

						<h4>{ __( 'Navigating with a keyboard', 'event_espresso' ) }</h4>
						<ul>
							<li>
								<abbr aria-label={ _x( 'Enter', 'keyboard button', 'event_espresso' ) }>↵</abbr>
								{ ' ' /* JSX removes whitespace, but a space is required for screen readers. */ }
								<span>{ __( 'Select the date in focus.', 'event_espresso' ) }</span>
							</li>
							<li>
								<abbr aria-label={ __( 'Left and Right Arrows', 'event_espresso' ) }>←/→</abbr>
								{ ' ' /* JSX removes whitespace, but a space is required for screen readers. */ }
								{ __( 'Move backward (left) or forward (right) by one day.', 'event_espresso' ) }
							</li>
							<li>
								<abbr aria-label={ __( 'Up and Down Arrows', 'event_espresso' ) }>↑/↓</abbr>
								{ ' ' /* JSX removes whitespace, but a space is required for screen readers. */ }
								{ __( 'Move backward (up) or forward (down) by one week.', 'event_espresso' ) }
							</li>
							<li>
								<abbr aria-label={ __( 'Page Up and Page Down', 'event_espresso' ) }>{ __( 'PgUp/PgDn', 'event_espresso' ) }</abbr>
								{ ' ' /* JSX removes whitespace, but a space is required for screen readers. */ }
								{ __( 'Move backward (PgUp) or forward (PgDn) by one month.', 'event_espresso' ) }
							</li>
							<li>
								<abbr aria-label={ __( 'Home and End', 'event_espresso' ) }>{ __( 'Home/End', 'event_espresso' ) }</abbr>
								{ ' ' /* JSX removes whitespace, but a space is required for screen readers. */ }
								{ __( 'Go to the first (home) or last (end) day of a week.', 'event_espresso' ) }
							</li>
						</ul>

						<Button isSmall onClick={ toggleHelp }>
							{ __( 'Close', 'event_espresso' ) }
						</Button>
					</div>
				</>
			) }

			{ ! calendarHelpIsVisible && (
				<Button
					className="components-datetime__date-help-button"
					isLink
					onClick={ toggleHelp }
				>
					{ __( 'Calendar Help', 'event_espresso' ) }
				</Button>
			) }
		</div>
	);
};
