import { useState } from '@wordpress/element';
import moment from 'moment-timezone';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const DateTimeRange = ( props ) => {
	const [ endDate, setEndDate ] = useState( moment( props.endDate ) || moment() );
	const [ startDate, setStartDate ] = useState( moment( props.startDate ) || moment() );
	const [ focusedInput, setFocusedInput ] = useState( null );

	const handleDateChange = ( dates ) => {
		setEndDate( dates.endDate );
		setStartDate( dates.startDate );
	};

	return (
		<DateRangePicker
			endDate={ endDate }
			endDateId="endDate"
			focusedInput={ focusedInput }
			isOutsideRange={ () => null }
			onDatesChange={ handleDateChange }
			onFocusChange={ setFocusedInput }
			startDate={ startDate }
			startDateId="startDate"
		/>
	);
};

export default DateTimeRange;
