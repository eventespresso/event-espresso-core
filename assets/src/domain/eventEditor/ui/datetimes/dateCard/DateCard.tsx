// @ts-nocheck
import React, { useState } from 'react';
import { parseISO } from 'date-fns';
import { EditableText, H4, H6, Popover } from '@blueprintjs/core/lib/esm';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { BiggieCalendarDate, CalendarPosition } from '@application/ui/calendars';
import DeleteDatetimeButton from './DeleteDateButton';
import EditDateButton from './EditDateButton';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';
import TicketIdTag from '../../tickets/TicketIdTag';

import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/constants/defaultDates';
import statusBgColorClass from '../../../../shared/entities/datetimes/helpers/statusBgColorClass';
import DateRangePicker from '../../../../shared/ui/dateRangeInput/DateRangePicker';

import { useEntityMutator, EntityType } from '@appServices/apollo/mutations';
import useRelations from '@appServices/apollo/relations/useRelations';
import { useStatus, TypeName } from '@appServices/apollo/status';
import { InlineEditInput } from '@appInputs';
import EntityPaperFrame from '@appLayout/EntityPaperFrame';
import { ListItemProps } from '../../../interfaces/types';

const cardStype: CSSProperties = {
	alignItems: 'stretch',
	boxSizing: 'border-box',
	display: 'flex',
	flexFlow: 'row nowrap', // change row to row-reverse for tickets
	height: '100%',
	padding: '0',
	justifyContent: 'space-between',
};

const dateStype: CSSProperties = {
	alignItems: 'stretch',
	boxSizing: 'border-box',
	padding: 0,
	maxWidth: '25%',
};

const detailsStype: CSSProperties = {
	boxSizing: 'border-box',
	padding: '1rem',
	maxWidth: 'calc(75% - 3rem)',
};

const menuWrapperStype: CSSProperties = {
	alignItems: 'stretch',
	boxSizing: 'border-box',
	flex: '0, 0, 3rem',
	padding: '.5rem',
};

const menuStype: CSSProperties = {
	alignContent: 'flex-start',
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	flexFlow: 'column nowrap',
	height: '100%',
};

const btnStyle: CSSProperties = {
	background: 'var(--ee-background-color)',
	border: '1px solid var(--ee-color-grey-8)',
	color: 'var(--ee-color-black)',
	margin: '0 0 .5rem',
};

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

	const bgClass = statusBgColorClass(date);

	return date ? (
		<DatetimeProvider id={date.id}>
			<EntityPaperFrame entity={date}>
				<div style={cardStype}>
					<div style={dateStype}>
						<BiggieCalendarDate headerText={__('starts')} htmlClass={bgClass} date={range[0]} />
					</div>
					<div style={detailsStype}>
						{/* the following will be replaced by the date entity details */}
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
						<H6>
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
						</H6>
						{/* the following will be replaced by the entity details panel */}
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
					</div>
					{/* the following will be replaced by the entity action menu */}
					<div style={menuWrapperStype}>
						<div style={menuStype}>
							<EditDateButton style={btnStyle} />
							<div>
								<Popover lazy>
									<EspressoButton icon='calendar' style={btnStyle} />
									<DateRangePicker onFieldUpdate={updateEntity} range={range} setRange={setRange} />
								</Popover>
							</div>
							{ticketsLoaded && <DeleteDatetimeButton id={date.id} style={btnStyle} />}
						</div>
					</div>
				</div>
			</EntityPaperFrame>
		</DatetimeProvider>
	) : null;
};

export default DateCard;
