import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { Popover } from '@infraUI/display';
import { useTimeZoneTime } from '@appServices/hooks';
import Trigger from './Trigger';
import './style.scss';

export interface Props {
	className?: string;
	date: Date;
	inline?: boolean;
}

const TimezoneTimeInfo: React.FC<Props> = ({ date, inline = true, ...props }) => {
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
	const className = classNames(props.className, 'ee-timezone-info', { 'ee-timezone-info--inline': inline });

	return (
		<div className={className}>
			<Popover
				content={content}
				header={__('This Date Converted To:')}
				trigger={<Trigger label={__('click for timezone\ninformation')} />}
			/>
		</div>
	);
};

export default React.memo(TimezoneTimeInfo);
