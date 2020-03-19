import React from 'react';
import classNames from 'classnames';

import './style.scss';

interface Props {
	className?: string;
	label?: string;
}

const ColorSwatch: React.FC<Props> = ({ className, label }) => {
	return <span aria-label={label} className={classNames('ee-color-swatch', className)}></span>;
};

export default ColorSwatch;
