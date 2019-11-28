import { Icon, Intent, Tag } from '@blueprintjs/core/lib/esm';
import classNames from 'classnames';
import moment from 'moment';
import * as React from 'react';

const FORMAT = 'dddd, LL';
const FORMAT_TIME = 'dddd, LL LT';

export const MomentDate = ({ date, withTime = false, format = withTime ? FORMAT_TIME : FORMAT }) => {
	const m = moment(date);
	if (m.isValid()) {
		return <Tag intent={Intent.PRIMARY}>{m.format(format)}</Tag>;
	} else {
		return <Tag minimal={true}>no date</Tag>;
	}
};

export const MomentDateRange = ({
	className,
	range: [start, end],
	withTime = false,
	format = withTime ? FORMAT_TIME : FORMAT,
}) => (
	<div className={classNames('docs-date-range', className)}>
		<MomentDate withTime={withTime} date={start} format={format} />
		<Icon icon='arrow-right' />
		<MomentDate withTime={withTime} date={end} format={format} />
	</div>
);
