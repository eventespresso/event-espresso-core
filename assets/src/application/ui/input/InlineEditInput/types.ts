import { EditableProps } from '@infraUI/inputs';

export interface HeadingProps extends Omit<EditableProps, 'inputType'> {
	// level?: 1 | 2 | 3 | 4 | 5;
}

export interface TextAreaProps extends Omit<EditableProps, 'inputType'> {}

export interface TextProps extends Omit<EditableProps, 'inputType'> {}
