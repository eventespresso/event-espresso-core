import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { GlobalOutlined } from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';
import useTimeZoneTime from '../../../../services/hooks/useTimeZoneTime';

import './style.scss';

export interface OffsetInfoProps {
	className?: string;
	date: Date;
	inline?: boolean;
}

const TimezoneTimeInfo: React.FC<OffsetInfoProps> = ({ className, date, inline = false }) => {
	const { formatDateForSite, formatDateForUser, formatUtcDateForSite } = useTimeZoneTime();
	const content = (
		<div>
			<div className={'ee-focus-priority-8'}>
				<strong>{__('Your Local Time Zone')}</strong>
			</div>
			<div className={'ee-focus-priority-6'}>{formatDateForUser(date)}</div>
			<br />
			<div className={'ee-focus-priority-8'}>
				<strong>{__("The Website's Time Zone")}</strong>
			</div>
			<div className={'ee-focus-priority-6'}>{formatDateForSite(date)}</div>
			<br />
			<div className={'ee-focus-priority-8'}>
				<strong>{__('UTC (Greenwich Mean Time)')}</strong>
			</div>
			<div className={'ee-focus-priority-6'}>{formatUtcDateForSite(date)}</div>
		</div>
	);
	const htmlClassName = classNames(className, 'ee-timezone-info', { 'ee-timezone-info--inline': inline });
	return (
		<Popover content={content} title={__('This Date Converted To:')} trigger={'click'} align={{ offset: [0, -60] }}>
			<div className={htmlClassName}>
				<Tooltip title={__('click for timezone\ninformation')} mouseEnterDelay={1}>
					<GlobalOutlined />
				</Tooltip>
			</div>
		</Popover>
	);
};

export default TimezoneTimeInfo;
