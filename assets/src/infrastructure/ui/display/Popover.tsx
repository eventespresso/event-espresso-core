import React from 'react';

import {
	Popover as ChakraPopover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
} from '@chakra-ui/core';

interface PopoverProps {
	content: React.ReactNode;
	header?: React.ReactNode;
	trigger: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ content, header, trigger, ...props }) => {
	return (
		<ChakraPopover {...props}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
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
