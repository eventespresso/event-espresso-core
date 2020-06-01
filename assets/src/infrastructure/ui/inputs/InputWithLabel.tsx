import React from 'react';
import classNames from 'classnames';

import { InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/core';

interface Props {
	className?: string;
	leftLabel?: React.ReactNode;
	rightLabel?: React.ReactNode;
}

const InputWithLabel: React.FC<Props> = ({ children, leftLabel, rightLabel, ...props }) => {
	const className = classNames(
		props.className,
		leftLabel && 'ee-input-with-label__left-label',
		rightLabel && 'ee-input-with-label__right-label'
	);

	return (
		<InputGroup className={className}>
			{leftLabel && <InputLeftAddon className='ee-input-with-label__left-addon' children={leftLabel} />}

			{children}

			{rightLabel && <InputRightAddon className='ee-input-with-label__right-addon' children={rightLabel} />}
		</InputGroup>
	);
};

export default InputWithLabel;
