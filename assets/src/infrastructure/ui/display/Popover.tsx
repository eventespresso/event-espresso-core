import React from 'react';

import {
	Popover as ChakraPopover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverProps as ChakraPopoverProps,
	PopoverTrigger,
} from '@chakra-ui/popover';

export interface PopoverProps extends ChakraPopoverProps {
	className?: string;
	content: React.ReactNode;
	contentClassName?: string;
	header?: React.ReactNode;
	trigger: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ content, contentClassName, header, trigger, ...props }) => {
	return (
		<ChakraPopover {...props}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent zIndex={4} className={contentClassName}>
				<PopoverArrow />
				<PopoverCloseButton className='ee-popover__close-button' color='var(--ee-button-text-color)' />
				{header && (
					<PopoverHeader className='ee-popover__header' color='var(--ee-button-text-color)'>
						{header}
					</PopoverHeader>
				)}
				<PopoverBody>{content}</PopoverBody>
			</PopoverContent>
		</ChakraPopover>
	);
};

export default React.memo(Popover);
