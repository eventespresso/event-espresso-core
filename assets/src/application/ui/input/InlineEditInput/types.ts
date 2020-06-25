import { InlineEditProps } from '@infraUI/inputs';

export interface TextAreaProps extends Omit<InlineEditProps, 'inputType'> { }

export interface TextProps extends Omit<InlineEditProps, 'inputType'> {
	fitText?: boolean;
	tag?: React.ElementType;
}

export interface TabbableTextProps {
	className?: string;
	icon?: React.ReactNode;
	onRequestEdit: VoidFunction;
	text?: string;
}
