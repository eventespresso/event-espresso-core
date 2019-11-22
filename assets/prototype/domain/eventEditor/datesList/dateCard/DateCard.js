import {
	Button,
	Card,
	EditableText,
	Elevation,
	H4,
	Popover
} from '@blueprintjs/core/lib/esm';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime/lib/esm';
import useDateItem from '../../containers/queries/useDateItem';
import useUpdateDateMutation from '../../containers/mutations/useUpdateDateMutation';

import DeleteDateButton from './DeleteDateButton';

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
	const updateDate = useUpdateDateMutation();
	const onTitleConfirm = (name) => {
		updateDate({
			variables: { input: { clientMutationId: 'xyz', id: date.id, name } }
		});
	};

	console.log({ date });

	return (
		<Card elevation={Elevation.ONE} style={cardStyle}>
			<div>
				<div style={idStyle}>{date.datetimeId}</div>
				<H4>
					<EditableText
						placeholder="Edit title..."
						defaultValue={date.name}
						onCancel={(value) => console.log(value)}
						onConfirm={onTitleConfirm}
						minWidth={'320px'}
						selectAllOnFocus
					/>
				</H4>
			</div>
			<div>
				<p>{date.description}</p>
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
			<DeleteDateButton id={date.datetimeId} />
		</Card>
	);
};

export default DateCard;
