import {
	Button,
	Card,
	EditableText,
	Elevation,
	H4,
	Popover
} from '@blueprintjs/core/lib/esm';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime/lib/esm';

const console= window.console;

const endTwoYears = new Date( new Date().getFullYear() + 2, 11, 31 );

const btnStyle = {
	margin: '0 0 0 1rem',
};
const cardStyle = {
	margin: '0 0 2rem',
	width: '32%',
};
const idStyle = {
	color: 'grey',
	fontSize: '9px',
	margin: '-1.5em 0 0 -1.25em',
};

const DateCard = ( { date } ) => (
	<Card elevation={ Elevation.ONE } style={ cardStyle }>
		<div>
			<div style={ idStyle }>{ date.id }</div>
			<H4>
				<EditableText
					placeholder="Edit title..."
					defaultValue={ date.name }
					onCancel={ ( value ) => console.log( value ) }
					onConfirm={ ( value ) => console.log( value ) }
					selectAllOnFocus
				/>
			</H4>
		</div>
		<div>
			<b>{ `${ date.startDate } ${ date.startTime }` }</b>
			<Popover lazy>
				<Button icon="calendar" style={ btnStyle } />
				<DatePicker
					defaultValue={ new Date( date.start * 1000 ) }
					formatDate={ ( jsDate ) => jsDate.toString() }
					onChange={ ( jsDate ) => console.log( jsDate ) }
					timePrecision={ TimePrecision.MINUTE }
					maxDate={ endTwoYears }
					highlightCurrentDay
				/>
			</Popover>
		</div>
	</Card>
);

export default DateCard;
