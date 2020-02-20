import React from 'react';
import { Tag } from 'antd';
import Icon from '@ant-design/icons';
import classNames from 'classnames';
import { format, isValid } from 'date-fns';

const FORMAT = 'EE MMM eo, yyyy';
const FORMAT_TIME = 'EE MMM eo, yyyy p';

const toUnixTimestamp = (date: Date) => Math.round(date.getTime() / 1000);
const now = toUnixTimestamp(new Date());

interface DateFCProps {
	withTime?: boolean;
	format?: string;
}

interface DateRangeDisplayProps extends DateFCProps {
	className?: string;
	range: [Date, Date];
}

interface DateTagProps extends DateFCProps {
	date: Date;
	color: string;
}

export const DateTag: React.FC<DateTagProps> = ({ date, color, withTime = false, format: formatStr }) => {
	const formatString = formatStr || (withTime ? FORMAT_TIME : FORMAT);
	if (isValid(date)) {
		return <Tag color={color}>{format(date, formatString)}</Tag>;
	} else {
		return <Tag>no date</Tag>;
	}
};

export const DateRangeDisplay: React.FC<DateRangeDisplayProps> = ({
	className,
	range: [start, end],
	withTime = false,
	format,
}) => {
	const startTime = toUnixTimestamp(start);
	const endTime = toUnixTimestamp(end);
	let startColor = '';
	let endColor = '';
	if (endTime > now) {
		endColor = 'var(--ee-color-blue)';
		if (startTime < now) {
			startColor = 'var(--ee-color-green)';
		} else {
			startColor = 'var(--ee-color-blue)';
		}
	}
	const formatString = format || (withTime ? FORMAT_TIME : FORMAT);
	return (
		<div className={classNames('docs-date-range', className)}>
			<DateTag withTime={withTime} date={start} color={startColor} format={formatString} />
			<Icon type='arrow-right' style={{ marginRight: '8px' }} />
			<DateTag withTime={withTime} date={end} color={endColor} format={formatString} />
		</div>
	);
};
