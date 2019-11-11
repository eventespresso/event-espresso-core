import { useState } from '@wordpress/element';
import { DateRangePicker as DefaultDateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const DateRangePicker = ( { className, endDate, handleDateChange, startDate } ) => {
	const [ focusedInput, setFocusedInput ] = useState( null );

	return (
		<div className={ className }>
			<DefaultDateRangePicker
				endDate={ endDate }
				endDateId="endDate"
				focusedInput={ focusedInput }
				isOutsideRange={ () => null }
				onDatesChange={ handleDateChange }
				onFocusChange={ setFocusedInput }
				noBorder={ true }
				startDate={ startDate }
				startDateId="startDate"
			/>
		</div>
	);
};

export default DateRangePicker;
