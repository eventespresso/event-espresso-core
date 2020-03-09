import React from 'react';
import classNames from 'classnames';

type Props = {
	className: string;
	sign: string;
};

const CurrencySign: React.FC<Props> = (props) => {
	const className = classNames('ee-currency-sign', props.className);

	return <div className={className}>{props.sign}</div>;
};

export default CurrencySign;
