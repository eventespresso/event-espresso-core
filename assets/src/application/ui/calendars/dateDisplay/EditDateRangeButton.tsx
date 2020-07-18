import React from 'react';
import { __ } from '@wordpress/i18n';

import { DateTimeRangePicker } from '../../input';
import { ButtonSize, ButtonType, IconButton } from '../../input';
import { CalendarOutlined, Popover } from '../../display';
import { EditDateButtonProps } from './types';

const EditDateRangeButton: React.FC<EditDateButtonProps> = ({ header, onEditHandler, startDate, endDate, tooltip }) => {
	const headerText = header ? header : __('Edit Start and End Dates and Times');
	return (
		<Popover
			className={'ee-edit-calendar-date-range'}
			content={<DateTimeRangePicker endDate={endDate} startDate={startDate} onChange={onEditHandler} />}
			header={<strong>{header}</strong>}
			trigger={
				<IconButton
					borderless
					buttonSize={ButtonSize.SMALL}
					buttonType={ButtonType.MINIMAL}
					className={'ee-edit-calendar-date-range-btn'}
					color={'white'}
					tooltip={tooltip}
					icon={CalendarOutlined}
				/>
			}
		/>
	);
};

export default EditDateRangeButton;
