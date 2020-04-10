import React from 'react';
import { __ } from '@wordpress/i18n';
import { GlobalOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

import { Tooltip } from '@infraUI/display';
import { useTimeZoneTime } from '@appServices/hooks';

import './style.scss';

export interface Props {
	date: Date;
}

const TimezoneTimeInfo: React.FC<Props> = ({ date }) => {
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
	const label = __('click for timezone\ninformation');
	const iconProps = {
		icon: GlobalOutlined,
		label,
	};

	return (
		<Popover content={content} title={__('This Date Converted To:')} trigger={'click'} align={{ offset: [0, -60] }}>
			<div className={htmlClassName}>
				<Tooltip title={__('click for timezone\ninformation')} showDelay={1}>
					<GlobalOutlined />
				</Tooltip>
			</div>
		</Popover>
	);
};

export default React.memo(TimezoneTimeInfo);
