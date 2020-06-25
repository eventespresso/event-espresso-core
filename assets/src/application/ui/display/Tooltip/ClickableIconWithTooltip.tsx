import React from 'react';
import classNames from 'classnames';
import { useDisclosure } from '@chakra-ui/hooks';

import { Tooltip } from '@infraUI/display';
import { ClickableIconWithTooltipProps } from './types';

import './style.scss';

const ClickableIconWithTooltip: React.FC<ClickableIconWithTooltipProps> = ({ icon: Icon, tooltipText, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const className = classNames('ee-clickable-tooltip', props.className);

	const onClick = () => {
		return isOpen ? onClose() : onOpen();
	};

	const icon = <Icon className={className} onClick={onClick} />;

	return (
		<Tooltip isOpen={isOpen} tooltip={tooltipText}>
			{icon}
		</Tooltip>
	);
};

export default ClickableIconWithTooltip;
