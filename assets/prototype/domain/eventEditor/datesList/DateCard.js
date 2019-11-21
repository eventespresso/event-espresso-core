import {
	Button,
	Card,
	EditableText,
	Elevation,
	H4,
	Popover
} from '@blueprintjs/core/lib/esm';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime/lib/esm';
import { AppToaster } from '../EventEditor';
import useDateItem from '../containers/useDateItem';

const console = window.console;

const endTwoYears = new Date(new Date().getFullYear() + 2, 11, 31);

const btnStyle = {
	margin: '0 0 0 .5rem'
};

const cardStyle = {
	margin: '0 0 2rem',
	minWidth: '360px',
	position: 'relative',
	textAlign: 'center',
	width: '32%'
};

const idStyle = {
	color: 'grey',
	fontSize: '9px',
	left: '.75em',
	position: 'absolute',
	top: '.5em'
};

const DateCard = ({ id }) => {
	const date = useDateItem({ id });

	return (
		<Card elevation={Elevation.ONE} style={cardStyle}>
			<div>
				<div style={idStyle}>{date.datetimeId}</div>
				<H4>
					<EditableText
						placeholder="Edit title..."
						defaultValue={date.name}
						onCancel={(value) => console.log(value)}
						onConfirm={(value) => console.log(value)}
						minWidth={'320px'}
						selectAllOnFocus
					/>
				</H4>
			</div>
			<div>
				<H4>{date.description}</H4>
			</div>
			<div>
				<b>{`${date.startDate} ${date.startTime}`}</b>
				<Popover lazy>
					<Button icon="calendar" style={btnStyle} minimal />
					<DatePicker
						defaultValue={new Date(date.start * 1000)}
						formatDate={(jsDate) => jsDate.toString()}
						onChange={(jsDate, isUserChange) => {
							if (jsDate && isUserChange) {
								date.start = jsDate.getTime() / 1000;
								date.startDate = jsDate.toDateString();
								date.startTime = jsDate.toLocaleTimeString();
								console.log(
									'%c > date.start: ',
									'color: #99c043;',
									new Date(date.start * 1000)
								);
							}
						}}
						timePrecision={TimePrecision.MINUTE}
						timePickerProps={{
							showArrowButtons: true,
							useAmPm: true
						}}
						maxDate={endTwoYears}
						highlightCurrentDay
						showActionsBar
					/>
				</Popover>
			</div>
			<div
				style={{
					margin: '0 -15px -15px 0',
					textAlign: 'right'
				}}
			>
				<Button
					icon="trash"
					onClick={() =>
						AppToaster.show({
							intent: 'danger',
							message: `Date ${date.id} Deleted`
						})
					}
					minimal
				/>
			</div>
		</Card>
	);
};

export default DateCard;
