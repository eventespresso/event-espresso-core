/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { BiggieCalendarDate, CalendarDateRange, EntityPaperFrame } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import EditorTicketEntityDetails from './editor-ticket-entity-details';
import EditorTicketActionsMenu from '../../../../../../../ZZZ/editor/events/tickets/editor-ticket/actions-menu/editor-ticket-actions-menu';

const { getBackgroundColorClass, getTicketStatusTextLabel, status, TICKET_STATUS_ID } = ticketModel;

/**
 * EditorTicketEntityGridItem
 *
 * @function
 *
 * @param {Object} ticketEntity
 * @param {string} displayTicketDate
 * @param {number} registrationCount
 * @return {Object} rendered ticket
 */
const EditorTicketEntityGridItem = ({ ticketEntity, displayTicketDate, registrationCount }) => {
	const ticketStart = ticketEntity.startDate.toISO();
	const ticketEnd = ticketEntity.endDate.toISO();
	const ticketStatusID = useMemo(() => status(ticketEntity), [
		ticketEntity.deleted,
		ticketEntity.sold,
		ticketEntity.qty,
		ticketStart,
		ticketEnd,
	]);
	const label = useMemo(() => {
		if (displayTicketDate === 'start') {
			if (ticketStatusID === TICKET_STATUS_ID.EXPIRED) {
				return __('Sale Ended', 'event_espresso');
			}
			if (ticketStatusID === TICKET_STATUS_ID.PENDING) {
				return __('Goes On Sale', 'event_espresso');
			}
			return __('Sale Started', 'event_espresso');
		}
		if (displayTicketDate === 'end') {
			if (ticketStatusID === TICKET_STATUS_ID.EXPIRED) {
				return __('Sale Ended', 'event_espresso');
			}
			return __('Sale Ends', 'event_espresso');
		}
	}, [ticketStatusID, displayTicketDate]);

	const ticketStatus = useMemo(
		() => (
			<span key={1} className={'ee-status-tag'}>
				{getTicketStatusTextLabel(ticketEntity)}
			</span>
		),
		// getTicketStatusTextLabel() relies solely on status()
		// which is same as ticketStatusID, so we can use that as a dependency
		[ticketStatusID]
	);

	const sidebarColorClass = useMemo(
		() => {
			const bgClass = getBackgroundColorClass(ticketEntity);
			return `ee-editor-ticket-calendar-sidebar ${bgClass}`;
		},
		// getBackgroundColorClass() also relies solely on status()
		// which is same as ticketStatusID, so we can use that as a dependency
		[ticketStatusID]
	);

	const ticketDate = useMemo(() => {
		switch (displayTicketDate) {
			case 'end':
				const end = ticketEntity.endDate.toFormat('h:mm a');
				return (
					<BiggieCalendarDate
						date={ticketEntity.endDate}
						htmlClass={sidebarColorClass}
						headerText={label}
						footerText={[end, ticketStatus]}
						position='right'
					/>
				);
			case 'both':
				return (
					<CalendarDateRange
						startDate={ticketEntity.startDate}
						endDate={ticketEntity.endDate}
						htmlClass={sidebarColorClass}
						headerText={__('Sale Date', 'event_espresso')}
						footerText={ticketStatus}
						position='right'
					/>
				);
			case 'start':
			default:
				const start = ticketEntity.startDate.toFormat('h:mm a');
				return (
					<BiggieCalendarDate
						date={ticketEntity.startDate}
						htmlClass={sidebarColorClass}
						headerText={label}
						footerText={[start, ticketStatus]}
						position='right'
					/>
				);
		}
	}, [
		// using ticketStatusID as a dependency here as well
		// and not using label since it shares same dependencies already
		ticketStatusID,
		displayTicketDate,
		ticketStart,
		ticketEnd,
	]);

	const dateStyleClass = displayTicketDate === 'both' ? 'ee-editor-date-range' : 'ee-editor-date-single';
	return (
		<EntityPaperFrame entityID={ticketEntity.id}>
			<div className={`ee-editor-ticket-main ${dateStyleClass}`}>
				<EditorTicketEntityDetails ticketEntity={ticketEntity} registrationCount={registrationCount} />
				{ticketDate}
			</div>
			<EditorTicketActionsMenu ticketEntity={ticketEntity} />
		</EntityPaperFrame>
	);
};

EditorTicketEntityGridItem.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
	displayTicketDate: PropTypes.string,
	registrationCount: PropTypes.number,
};

EditorTicketEntityGridItem.defaultProps = {
	displayTicketDate: 'start',
};

export default ifValidTicketEntity(EditorTicketEntityGridItem);
