import { InlineEditProps } from '@infraUI/inputs';

export interface TextAreaProps extends Omit<InlineEditProps, 'inputType'> { tooltip?: string; }

export interface TextProps extends Omit<InlineEditProps, 'inputType'> {
	fitText?: boolean;
	tag?: React.ElementType;
	tooltip?: string;
}

export interface TabbableTextProps {
	className?: string;
	icon?: React.ReactNode;
	onRequestEdit: VoidFunction;
	text?: string;
	tooltip?: string;
}
