import React from 'react';
import type { EditableProps as ChakraEditableProps } from '@chakra-ui/core';

import { CommonInputProps } from '../types';

export type InputType = 'text' | 'heading' | 'textarea';

export interface EditableProps extends Partial<ChakraEditableProps>, CommonInputProps<HTMLInputElement> {
	inputType?: InputType;
	Preview?: React.ComponentType<EditablePreviewProps>;
}

export interface EditablePreviewProps extends Partial<Omit<EditableProps, 'onChange' | 'onChangeValue'>> {
	isEditing?: boolean;
	onRequestEdit?: VoidFunction;
}

export interface EditableInputProps extends Pick<EditableProps, 'inputType'> {
	onCancel: VoidFunction;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}
