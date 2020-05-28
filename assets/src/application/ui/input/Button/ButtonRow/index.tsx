import React from 'react';
import classNames from 'classnames';

interface ButtonGroup {
	className?: string;
}

import './style.scss';

const ButtonRow: React.FC<ButtonGroup> = ({ children, ...props }) => {
	const className = classNames(props.className, 'ee-btn-row');

	return <div className={className}>{children}</div>;
};

export default ButtonRow;
