import React, { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { __ } from '@wordpress/i18n';
import { parseISO } from 'date-fns';

import { DateRange } from '@infraUI/inputs/dateTime';
import { useMemoStringify, useTimeZoneTime } from '@application/services/hooks';
import { DateTimeRangePicker } from '../../input';
import { ButtonSize, ButtonType, IconButton } from '../../input';
import { CalendarOutlined, Popover } from '../../display';
import { EditDateButtonProps } from './types';

const EditDateRangeButton: React.FC<EditDateButtonProps> = ({ header, onEditHandler, startDate, endDate, tooltip }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const headerText = header ? header : __('Edit Start and End Dates and Times');
	const onChange = useCallback(
		(dates: DateRange) => {
			onEditHandler(dates);
			onClose();
		},
		[onClose, onEditHandler]
	);
	const { utcToSiteTime } = useTimeZoneTime();

	const value = useMemoStringify<DateRange>([utcToSiteTime(parseISO(startDate)), utcToSiteTime(parseISO(endDate))]);

	return (
		<Popover
			className={'ee-edit-calendar-date-range'}
			closeOnBlur={false}
			content={<DateTimeRangePicker onChange={onChange} value={value} />}
			header={<strong>{headerText}</strong>}
			isOpen={isOpen}
			onClose={onClose}
			trigger={
				<IconButton
					borderless
					buttonSize={ButtonSize.SMALL}
					buttonType={ButtonType.MINIMAL}
					className={'ee-edit-calendar-date-range-btn'}
					color={'white'}
					onClick={onOpen}
					tooltip={tooltip}
					icon={CalendarOutlined}
				/>
			}
		/>
	);
};

export default EditDateRangeButton;
