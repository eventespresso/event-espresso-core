import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import Popover from '../Popover';
import { useTimeZoneTime } from '@appServices/hooks';
import Trigger from './Trigger';
import './style.scss';

export interface Props {
	className?: string;
	date: Date;
}

const TimezoneTimeInfo: React.FC<Props> = ({ date, ...props }) => {
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
	const className = classNames(props.className, 'ee-timezone-info');

	return (
		<div className={className}>
			<Popover
				content={content}
				header={__('This Date Converted To:')}
				trigger={
					<Trigger tooltip={__('click for timezone\ninformation')} />
				}
			/>
		</div>
	);
};

export default React.memo(TimezoneTimeInfo);
