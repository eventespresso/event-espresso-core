import { useState } from '@wordpress/element';
import moment from 'moment-timezone';
import DateRangePicker from '../DateRangePicker';
import TimePicker from '../TimePicker';
import { useIs12HourTime } from '@eventespresso/hooks';
import './style.css';

const DateTimeRangePicker = ( props ) => {
	const is12HourTime = useIs12HourTime();
	const [ endDate, setEndDate ] = useState( moment( props.endDate ) || moment() );
	const [ startDate, setStartDate ] = useState( moment( props.startDate ) || moment() );

	const handleDateChange = ( dates ) => {
		setEndDate( moment( dates.endDate ) );
		setStartDate( moment( dates.startDate ) );
	};

	const onEndChange = ( date ) => setStartDate( moment( date ) );
	const onStartChange = ( date ) => setStartDate( moment( date ) );

	return (
		<div className="ee-date-range-picker-wrapper">
			<DateRangePicker
				className="ee-date-range-picker"
				endDate={ endDate }
				handleDateChange={ handleDateChange }
				startDate={ startDate }
			/>
			<TimePicker
				className="start"
				is12Hour={ is12HourTime }
				onChange={ onStartChange }
			/>
			<TimePicker
				className="end"
				is12Hour={ is12HourTime }
				onChange={ onEndChange }
			/>
		</div>
	);
};

export default DateTimeRangePicker;
