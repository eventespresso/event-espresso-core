import { Icon, Intent, Tag } from '@blueprintjs/core/lib/esm';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';

const FORMAT = 'dddd, LL';
const FORMAT_TIME = 'dddd, LL LT';

interface MomentDateFCProps {
	withTime?: boolean;
	format?: string;
}

interface MomentDateRangeProps extends MomentDateFCProps {
	className?: string;
	range: [Date, Date];
}

interface MomentDateProps extends MomentDateFCProps {
	date: Date;
}

export const MomentDate: React.FC<MomentDateProps> = ({
	date,
	withTime = false,
	format = withTime ? FORMAT_TIME : FORMAT,
}): JSX.Element => {
	const m = moment(date);
	if (m.isValid()) {
		return <Tag intent={Intent.SUCCESS}>{m.format(format)}</Tag>;
	} else {
		return <Tag minimal={true}>no date</Tag>;
	}
};

export const MomentDateRange: React.FC<MomentDateRangeProps> = ({
	className,
	range: [start, end],
	withTime = false,
	format = withTime ? FORMAT_TIME : FORMAT,
}): JSX.Element => (
	<div className={classNames('docs-date-range', className)}>
		<MomentDate withTime={withTime} date={start} format={format} />
		<Icon icon='arrow-right' />
		<MomentDate withTime={withTime} date={end} format={format} />
	</div>
);
