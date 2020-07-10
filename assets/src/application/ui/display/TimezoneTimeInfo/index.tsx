import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import Popover from '../Popover';
import { useTimeZoneTime } from '@appServices/hooks';
import Trigger from './Trigger';
import './style.scss';

export interface Props {
	borderless?: boolean;
	className?: string;
	color?: 'white' | 'black';
	date: Date;
	size?: 'big' | 'bigger' | 'small' | 'smaller' | 'tiny';
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
				header={__('This Time Converted To:')}
				trigger={<Trigger tooltip={__('click for timezone\ninformation')} {...props} />}
			/>
		</div>
	);
};

export default React.memo(TimezoneTimeInfo);
