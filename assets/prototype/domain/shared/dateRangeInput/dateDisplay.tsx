import React from 'react';
import { Icon, Intent, Tag } from '@blueprintjs/core/lib/esm';
import classNames from 'classnames';
import { format, isValid } from 'date-fns';

const FORMAT = 'EEEE, PPP';
const FORMAT_TIME = 'EEEE, PPP p';

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
}

export const DateTag: React.FC<DateTagProps> = ({ date, withTime = false, format: formatStr }): JSX.Element => {
	const formatString = formatStr || (withTime ? FORMAT_TIME : FORMAT);
	if (isValid(date)) {
		return <Tag intent={Intent.SUCCESS}>{format(date, formatString)}</Tag>;
	} else {
		return <Tag minimal={true}>no date</Tag>;
	}
};

export const DateRangeDisplay: React.FC<DateRangeDisplayProps> = ({
	className,
	range: [start, end],
	withTime = false,
	format,
}): JSX.Element => {
	const formatString = format || (withTime ? FORMAT_TIME : FORMAT);
	return (
		<div className={classNames('docs-date-range', className)}>
			<DateTag withTime={withTime} date={start} format={formatString} />
			<Icon icon='arrow-right' />
			<DateTag withTime={withTime} date={end} format={formatString} />
		</div>
	);
};
