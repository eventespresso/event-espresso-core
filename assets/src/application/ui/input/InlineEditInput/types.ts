import { InlineEditProps } from '@infraUI/inputs';

export interface TextAreaProps extends Omit<InlineEditProps, 'inputType'> {}

export interface TextProps extends Omit<InlineEditProps, 'inputType'> {
	tag?: React.ElementType;
}
