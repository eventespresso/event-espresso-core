import React from 'react';
import {
	IconButton,
	Popover as ChakraPopover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
} from '@chakra-ui/core';
import { Icons } from '@chakra-ui/core/dist/theme/icons';
import { __ } from '@wordpress/i18n';

type IconProps = {
	label: string;
	icon: Icons;
};

interface PopoverProps {
	content: React.ReactNode;
	header?: React.ReactNode;
	iconProps: IconProps;
}

const Popover: React.FC<PopoverProps> = ({ content, header, iconProps, ...props }) => {
	return (
		<ChakraPopover {...props}>
			<PopoverTrigger>
				<IconButton aria-label={iconProps.label} icon={iconProps.icon} variant='unstyled' />
			</PopoverTrigger>
			<PopoverContent zIndex={4}>
				<PopoverArrow />
				<PopoverCloseButton className='ee-popover__close-button' color='var(--ee-color-black)' />
				{header && (
					<PopoverHeader className='ee-popover__header' color='var(--ee-color-black)'>
						{header}
					</PopoverHeader>
				)}
				<PopoverBody>{content}</PopoverBody>
			</PopoverContent>
		</ChakraPopover>
	);
};

export default React.memo(Popover);
