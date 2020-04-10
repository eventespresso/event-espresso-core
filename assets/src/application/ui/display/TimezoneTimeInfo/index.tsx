import React from 'react';
import classNames from 'classnames';
import { IconButton } from '@chakra-ui/core';
import { __ } from '@wordpress/i18n';

import { Popover, Tooltip } from '@infraUI/display';
import { useTimeZoneTime } from '@appServices/hooks';

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
	const label = __('click for timezone\ninformation');

	return (
		<div className={className}>
			<Popover
				content={content}
				header={__('This Date Converted To:')}
				trigger={
					<Tooltip title={label}>
						<IconButton aria-label={label} icon='info-outline' variant='unstyled' />
					</Tooltip>
				}
			/>
		</div>
	);
};

export default React.memo(TimezoneTimeInfo);
