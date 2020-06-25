import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

import { Tooltip } from '@infraUI/display';
import { ClickableIconWithTooltipProps } from './types';

import './style.scss';

const ClickableIconWithTooltip: React.FC<ClickableIconWithTooltipProps> = ({ icon: Icon, tooltipText }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onClick = () => {
		return isOpen ? onClose() : onOpen();
	};

	const icon = <Icon className='ee-clickable-tooltip' onClick={onClick} />;

	return (
		<Tooltip isOpen={isOpen} tooltip={tooltipText}>
			{icon}
		</Tooltip>
	);
};

export default ClickableIconWithTooltip;
