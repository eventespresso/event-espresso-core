// @ts-nocheck
import React, { useState } from 'react';
import { parseISO } from 'date-fns';
import { Card, EditableText, Elevation, H4, H6, Popover } from '@blueprintjs/core/lib/esm';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import DeleteDatetimeButton from './DeleteDateButton';
import EditDateButton from './EditDateButton';

import { DatetimeProvider } from '../../../services/context/DatetimeContext';
import useDatetimeItem from '../../../services/apollo/queries/datetimes/useDatetimeItem';
import TicketIdTag from '../../tickets/TicketIdTag';

import DateRangePicker from '../../../../shared/ui/dateRangeInput/DateRangePicker';
import { DateRangeDisplay } from '../../../../shared/ui/dateRangeInput/dateDisplay';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/constants/defaultDates';

import { useEntityMutator, EntityType } from '../../../../../application/services/apollo/mutations';
import useRelations from '../../../../../application/services/apollo/relations/useRelations';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import { InlineEditInput } from '../../../../../application/ui/input';
import { ListItemProps } from '../../../interfaces/types';
import { btnStyle, cardStyle, idStyle } from './styles';

const DateCard: React.FC<ListItemProps> = ({ id }) => {
	const date = useDatetimeItem({ id });
	const { isLoaded } = useStatus();
	const { updateEntity } = useEntityMutator(EntityType.Datetime, id);
	const { getRelations } = useRelations();

	const startDate = parseISO(date.startDate) || PLUS_ONE_MONTH;
	const endDate = parseISO(date.endDate) || PLUS_TWO_MONTHS;
	const defaultRangeValues: [Date, Date] = [startDate, endDate];
	const [range, setRange] = useState<[Date, Date]>(defaultRangeValues);
	if (!date) {
		return null;
	}

	// get related ticket IDs for this datetime
	const relatedTicketIds = getRelations({
		entity: 'datetimes',
		entityId: id,
		relation: 'tickets',
	});

	const ticketsLoaded = isLoaded(TypeName.tickets);

	return date ? (
		<DatetimeProvider id={date.id}>
			<Card elevation={Elevation.ONE} style={cardStyle}>
				<EditDateButton position='top' />
				<div style={idStyle}>
					{date.dbId} {':'} {date.id}
				</div>
				<H4>
					<InlineEditInput
						component={EditableText}
						placeholder={__('Edit title...')}
						value={date.name}
						onCancel={(value: any): void => {
							console.log('DatetimeProvider title onCancel => NEEDS CALLBACK');
							console.log('value', value);
						}}
						onConfirm={(name: string): void => {
							if (name !== date.name) {
								updateEntity({ name });
							}
						}}
						minWidth={320}
						selectAllOnFocus
					/>
				</H4>
				<div>
					<InlineEditInput
						component={EditableText}
						placeholder={__('Edit description...')}
						value={date.description}
						onCancel={(value: any): void => {
							console.log('DatetimeProvider desc onCancel => NEEDS CALLBACK');
							console.log('value', value);
						}}
						onConfirm={(description: string): void => {
							if (description !== date.description) {
								updateEntity({ description });
							}
						}}
						minWidth={320}
						multiline={true}
						maxLines={4}
						selectAllOnFocus
					/>
				</div>
				<div>
					<DateRangeDisplay range={range} withTime />
					<Popover lazy>
						<EspressoButton icon='calendar' />
						<DateRangePicker onFieldUpdate={updateEntity} range={range} setRange={setRange} />
					</Popover>
				</div>
				<div>
					{ticketsLoaded && (
						<>
							{__('Related Tickets:')}{' '}
							{relatedTicketIds.filter(Boolean).map((ticketId) => (
								<TicketIdTag key={ticketId} id={ticketId} />
							))}
						</>
					)}
				</div>
				{/* Delete button should be hidden to avoid relational inconsistencies */}
				{ticketsLoaded && <DeleteDatetimeButton id={date.id} />}
			</Card>
		</DatetimeProvider>
	) : null;
};

export default DateCard;
