// @ts-nocheck
import React, { useState } from 'react';
import { parseISO } from 'date-fns';
import { /* EditableText, */ Popover } from '@blueprintjs/core/lib/esm';
import { Typography } from 'antd';

import { __ } from '@wordpress/i18n';

import { BiggieCalendarDate, CalendarPosition } from '@application/ui/calendars';
import DateActionsMenu from './DateActionsMenu';

import { DatetimeProvider } from '@edtrServices/context/DatetimeContext';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';
import TicketIdTag from '../../tickets/TicketIdTag';

import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/constants/defaultDates';
import statusBgColorClass from '../../../../shared/entities/datetimes/helpers/statusBgColorClass';

import { useEntityMutator, EntityType } from '@appServices/apollo/mutations';
import useRelations from '@appServices/apollo/relations/useRelations';
import { useStatus, TypeName } from '@appServices/apollo/status';
// import { InlineEditInput } from '@appInputs';
import EntityPaperFrame from '@appLayout/EntityPaperFrame';
import { ListItemProps } from '../../../interfaces/types';

const { Title, Paragraph } = Typography;

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
	padding: '.5rem 1rem',
	maxWidth: 'calc(75% - 3rem)',
};

const detailsWrapperStype: CSSProperties = {
	alignContent: 'space-between',
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	flexFlow: 'column nowrap',
	height: '100%',
	justifyContent: 'space-between',
	width: '100%',
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

const hdrStyle: CSSProperties = {
	color: 'var(--ee-default-text-color)',
	fontSize: 'var(--ee-font-size-bigger )',
	fontWeight: 'bold',
	letterSpacing: 'var(--ee-letter-spacing-font-size-huge)',
	lineHeight: 'calc(var(--ee-line-height-modifier) * .875)',
	margin: '0 0 .25rem',
	padding: 0,
	textAlign: 'center',
	width: '100%',
};

const textStyle: CSSProperties = {
	textAlign: 'center',
	width: '100%',
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

	const ticketsLoaded = isLoaded(TypeName.tickets);

	// get related ticket IDs for this datetime
	const relatedTicketIds =
		ticketsLoaded &&
		getRelations({
			entity: 'datetimes',
			entityId: id,
			relation: 'tickets',
		});

	let relatedTicketTags =
		ticketsLoaded &&
		relatedTicketIds.filter(Boolean).map((ticketId) => <TicketIdTag key={ticketId} id={ticketId} />);
	relatedTicketTags = relatedTicketTags ? relatedTicketTags : __('none');

	const bgClass = statusBgColorClass(date);

	return date ? (
		<DatetimeProvider id={date.id}>
			<EntityPaperFrame entity={date}>
				<div style={cardStype}>
					<div style={dateStype}>
						<BiggieCalendarDate headerText={__('starts')} htmlClass={bgClass} date={range[0]} />
					</div>
					<div style={detailsStype}>
						<div style={detailsWrapperStype}>
							{/* the following will be replaced by the date entity details */}
							<Title
								level={2}
								style={hdrStyle}
								className={'ee-focus-priority-2'}
								editable={{
									onChange: (name: string): void => {
										if (name !== date.name) {
											updateEntity({ name });
										}
									},
								}}
								ellipsis={{ rows: 2 }}
							>
								{date.name ? date.name : __('Edit title...')}
							</Title>
							<Paragraph
								style={textStyle}
								editable={(description: string): void => {
									if (description !== date.description) {
										updateEntity({ description });
									}
								}}
								ellipsis={{ rows: 2, expandable: true }}
							>
								{date.description ? date.description : __('Edit description...')}
							</Paragraph>
							{/* the following will be replaced by the entity details panel */}
							<div>
								{__('Related Tickets:') + ' '}
								{relatedTicketTags}
							</div>
							<DateDetails datetime={date} updateDatetime={updateEntity} />
						</div>
					</div>
					<div style={menuWrapperStype}>
						<DateActionsMenu entity={date} menuItemProps={{ style: btnStyle }} style={menuStype} />
					</div>
				</div>
			</EntityPaperFrame>
		</DatetimeProvider>
	) : null;
};

export default DateCard;
