import { useState } from '@wordpress/element';
import moment from 'moment';
import { Button, Card, EditableText, Elevation, H4, H6, Popover } from '@blueprintjs/core/lib/esm';
import DeleteDateButton from './DeleteDateButton';
import DateRangePicker from '../../../shared/dateRangeInput/DateRangePicker';
import { MomentDateRange } from '../../../shared/dateRangeInput/momentDate';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../shared/defaultDates';

import useDateItem from '../../containers/queries/useDateItem';
import useUpdateDateMutation from '../../containers/mutations/useUpdateDateMutation';
import useRelations from '../../../../infrastructure/services/relations/useRelations';
import TicketId from '../TicketId';

const btnStyle = {
	margin: '0 0 0 .5rem',
};

const cardStyle = {
	margin: '0 0 2rem',
	minWidth: '360px',
	position: 'relative',
	textAlign: 'center',
	width: '32%',
};

const idStyle = {
	color: 'grey',
	fontSize: '9px',
	left: '.75em',
	position: 'absolute',
	top: '.5em',
};

const DateCard = ({ eventId, id }) => {
	const date = useDateItem({ id });

	const onFieldUpdate = useUpdateDateMutation({ id });
	const { getRelations } = useRelations();
	// get related tickets for this datetime
	const relatedTickets = getRelations({
		entity: 'datetimes',
		entityId: id,
		relation: 'tickets',
	}).map((ticketId) => <TicketId key={ticketId} id={ticketId} />);

	const startDate = moment(date.startDate).toDate() || PLUS_ONE_MONTH;
	const endDate = moment(date.endDate).toDate() || PLUS_TWO_MONTHS;
	const defaultRangeValues = [startDate, endDate];
	const [range, setRange] = useState(defaultRangeValues);

	return (
		<Card elevation={Elevation.ONE} style={cardStyle}>
			<div>
				<div style={idStyle}>
					{date.datetimeId} {':'} {date.id}
				</div>
				<H4>
					<EditableText
						placeholder='Edit title...'
						defaultValue={date.name}
						onCancel={(value) => console.log(value)}
						onConfirm={(name) => onFieldUpdate({ name })}
						minWidth={'320px'}
						selectAllOnFocus
					/>
				</H4>
			</div>
			<div>
				<H6>
					<EditableText
						placeholder='Edit description...'
						defaultValue={date.description}
						onCancel={(value) => console.log(value)}
						onConfirm={(description) => onFieldUpdate({ description })}
						minWidth={'320px'}
						multiline={true}
						maxLines={4}
						selectAllOnFocus
					/>
				</H6>
			</div>
			<div>
				<MomentDateRange range={range} withTime />
				<Popover lazy>
					<Button icon='calendar' style={btnStyle} minimal />
					<DateRangePicker onFieldUpdate={onFieldUpdate} range={range} setRange={setRange} />
				</Popover>
			</div>
			<div>
				{'Related Tickets: '} {relatedTickets}
			</div>
			<DeleteDateButton eventId={eventId} id={date.id} />
		</Card>
	);
};

export default DateCard;
