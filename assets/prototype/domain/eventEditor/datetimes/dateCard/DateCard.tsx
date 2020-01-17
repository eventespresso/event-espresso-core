import React, { useState, CSSProperties } from 'react';
import moment from 'moment';
import { Button, Card, EditableText, Elevation, H4, H6, Popover } from '@blueprintjs/core/lib/esm';

import DeleteDatetimeButton from './DeleteDateButton';
import EditDatetime from './EditDate';

import DateTimeProvider from '../../context/DateTimeProvider';
import useDatetimeItem from '../../data/queries/datetimes/useDatetimeItem';
import TicketId from '../../tickets/TicketId';

import DateRangePicker from '../../../shared/dateRangeInput/DateRangePicker';
import { MomentDateRange } from '../../../shared/dateRangeInput/momentDate';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../shared/defaultDates';

import { useEntityMutator, EntityType, MutationResult } from '../../../../application/services/apollo/mutations';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import InlineEditInput from '../../../../application/ui/components/input/InlineEditInput';
import { ListItemProps } from '../../types';

const btnStyle: CSSProperties = {
	margin: '0 0 0 .5rem',
};

const cardStyle: CSSProperties = {
	margin: '0 0 2rem',
	minWidth: '360px',
	position: 'relative' as 'relative', // cast value to type
	textAlign: 'center' as 'center',
	width: '32%',
};

const idStyle: CSSProperties = {
	color: 'grey',
	fontSize: '9px',
	left: '.75em',
	position: 'absolute' as 'absolute',
	top: '.5em',
};

const DateCard: React.FC<ListItemProps> = ({ id }): JSX.Element => {
	const date = useDatetimeItem({ id });
	const { isLoaded } = useStatus();
	const { updateEntity } = useEntityMutator(EntityType.Datetime, id);
	const { getRelations } = useRelations();

	// get related ticket IDs for this datetime
	const relatedTicketIds = getRelations({
		entity: 'datetimes',
		entityId: id,
		relation: 'tickets',
	});

	const startDate: Date = moment(date.startDate).toDate() || PLUS_ONE_MONTH;
	const endDate: Date = moment(date.endDate as moment.MomentInput).toDate() || PLUS_TWO_MONTHS;
	const defaultRangeValues: [Date, Date] = [startDate, endDate];
	const [range, setRange] = useState<[Date, Date]>(defaultRangeValues);

	const ticketsLoaded = isLoaded(TypeName.tickets);

	return date ? (
		<DateTimeProvider id={date.id}>
			<Card elevation={Elevation.ONE} style={cardStyle}>
				<EditDatetime id={date.id} position='top' relatedTickets={relatedTicketIds} />
				<div style={idStyle}>
					{date.dbId} {':'} {date.id}
				</div>
				<H4>
					<InlineEditInput
						component={EditableText}
						placeholder='Edit title...'
						value={date.name}
						defaultValue={date.name}
						onCancel={(value: any): void => {
							console.log('DateTimeProvider title onCancel => NEEDS CALLBACK');
							console.log('value', value);
						}}
						onConfirm={(name: string): MutationResult => updateEntity({ name })}
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
							onCancel={(value: any): void => {
								console.log('DateTimeProvider desc onCancel => NEEDS CALLBACK');
								console.log('value', value);
							}}
							onConfirm={(description: string): MutationResult => updateEntity({ description })}
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
				{ticketsLoaded && <DeleteDatetimeButton id={date.id} />}
			</Card>
		</DateTimeProvider>
	) : null;
};

export default DateCard;
