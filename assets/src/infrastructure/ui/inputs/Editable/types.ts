import { EditableProps as ChakraEditableProps, PseudoBoxProps } from '@chakra-ui/core';

export interface EditableProps extends Omit<ChakraEditableProps, 'children'> {
	editableInputProps?: EditableInputProps;
}

export interface EditableInputProps extends PseudoBoxProps {
	type?: string;
}
