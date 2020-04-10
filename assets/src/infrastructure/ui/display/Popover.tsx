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
import { __ } from '@wordpress/i18n';

interface IconProps {
	label: string;
	icon: React.ComponentType;
}

interface PopoverProps {
	content: JSX.Element;
	header?: string;
	iconProps: IconProps;
}

const Popover: React.FC<PopoverProps> = ({ content, header, iconProps, ...props }) => (
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

export default React.memo(Popover);
