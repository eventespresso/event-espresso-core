import { useState } from '@wordpress/element';
import moment from 'moment';
import { Button, Card, EditableText, Elevation, H4, H6, Popover } from '@blueprintjs/core/lib/esm';
import DateTimeProvider from '../../context/DateTimeProvider';
import EditDate from './EditDate';
import DeleteDateButton from './DeleteDateButton';
import DateRangePicker from '../../../shared/dateRangeInput/DateRangePicker';
import { MomentDateRange } from '../../../shared/dateRangeInput/momentDate';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../shared/defaultDates';

import useDateItem from '../../data/queries/datetimes/useDateItem';
import useEntityMutator from '../../../../application/services/apollo/mutations/useEntityMutator';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import useStatus from '../../../../application/services/apollo/status/useStatus';
import TicketId from '../../tickets/TicketId';
import InlineEditInput from '../../../../application/ui/components/input/InlineEditInput';

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

const DateCard = ({ id }) => {
	const date = useDateItem({ id });
	const { isLoaded } = useStatus();

	const { updateEntity } = useEntityMutator('Datetime', id);

	const { getRelations } = useRelations();

	// get related ticket IDs for this datetime
	const relatedTicketIds = getRelations({
		entity: 'datetimes',
		entityId: id,
		relation: 'tickets',
	});

	const startDate = moment(date.startDate).toDate() || PLUS_ONE_MONTH;
	const endDate = moment(date.endDate).toDate() || PLUS_TWO_MONTHS;
	const defaultRangeValues = [startDate, endDate];
	const [range, setRange] = useState(defaultRangeValues);

	const ticketsLoaded = isLoaded('tickets');

	return (
		<DateTimeProvider id={id}>
			<Card elevation={Elevation.ONE} style={cardStyle}>
				<EditDate position='top' relatedTickets={relatedTicketIds} />
				<div style={idStyle}>
					{date.dbId} {':'} {date.id}
				</div>
				<H4>
					<InlineEditInput
						component={EditableText}
						placeholder='Edit title...'
						value={date.name}
						defaultValue={date.name}
						onCancel={(value) => console.log(value)}
						onConfirm={(name) => updateEntity({ name })}
						minWidth={'320px'}
						selectAllOnFocus
					/>
				</H4>
				<div>
					<H6>
						<InlineEditInput
							component={EditableText}
							placeholder='Edit description...'
							value={date.description}
							defaultValue={date.description}
							onCancel={(value) => console.log(value)}
							onConfirm={(description) => updateEntity({ description })}
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
						<DateRangePicker onFieldUpdate={updateEntity} range={range} setRange={setRange} />
					</Popover>
				</div>
				<div>
					{ticketsLoaded && (
						<>
							{'Related Tickets: '}{' '}
							{relatedTicketIds.map((ticketId) => {
								return ticketId ? <TicketId key={ticketId} id={ticketId} /> : null;
							})}
						</>
					)}
				</div>
				{/* Delete button should be hidden to avoid relational inconsistencies */}
				{ticketsLoaded && <DeleteDateButton id={date.id} />}
			</Card>
		</DateTimeProvider>
	);
};

export default DateCard;
