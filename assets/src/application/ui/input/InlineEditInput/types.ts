import { EditableProps } from '@infraUI/inputs';

export interface TextAreaProps extends Omit<EditableProps, 'inputType'> {}

export interface TextProps extends Omit<EditableProps, 'inputType'> {
	tag?: React.ElementType;
}
