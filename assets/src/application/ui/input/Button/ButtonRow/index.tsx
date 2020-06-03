import React from 'react';
import classNames from 'classnames';

interface ButtonGroup {
	className?: string;
	rightAligned?: boolean;
}

import './style.scss';

const ButtonRow: React.FC<ButtonGroup> = ({ children, rightAligned, ...props }) => {
	const className = classNames(props.className, rightAligned && 'ee-btn-row--right-aligned', 'ee-btn-row');

	return <div className={className}>{children}</div>;
};

export default ButtonRow;
