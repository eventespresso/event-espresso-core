import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

type Props = {
	className?: string;
};

const PercentSign: React.FC<Props> = (props) => {
	const className = classNames('ee-percent-sign', props.className);
	return <div className={className}>{__('%')}</div>;
};

export default PercentSign;
