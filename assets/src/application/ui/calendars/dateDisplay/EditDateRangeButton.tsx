import React, { useCallback, useState } from 'react';
import { __ } from '@wordpress/i18n';

import { DateTimeRangePicker } from '../../input';
import { ButtonSize, ButtonType, IconButton } from '../../input';
import { CalendarOutlined, Popover } from '../../display';
import { EditDateButtonProps } from './types';

const EditDateRangeButton: React.FC<EditDateButtonProps> = ({ header, onEditHandler, startDate, endDate, tooltip }) => {
	const [isOpen, setIsOpen] = useState(false);
	const headerText = header ? header : __('Edit Start and End Dates and Times');
	const open = useCallback(() => setIsOpen(true), [setIsOpen]);
	const close = useCallback(() => setIsOpen(false), [setIsOpen]);
	const onChange = useCallback(
		(dates: string[]) => {
			onEditHandler(dates);
			close();
		},
		[onEditHandler]
	);
	return (
		<Popover
			className={'ee-edit-calendar-date-range'}
			closeOnBlur={false}
			content={<DateTimeRangePicker endDate={endDate} startDate={startDate} onChange={onChange} />}
			header={<strong>{headerText}</strong>}
			isOpen={isOpen}
			onClose={close}
			trigger={
				<IconButton
					borderless
					buttonSize={ButtonSize.SMALL}
					buttonType={ButtonType.MINIMAL}
					className={'ee-edit-calendar-date-range-btn'}
					color={'white'}
					onClick={open}
					tooltip={tooltip}
					icon={CalendarOutlined}
				/>
			}
		/>
	);
};

export default EditDateRangeButton;
