import React from 'react';
import type { EditableProps as ChakraEditableProps } from '@chakra-ui/core';

import { CommonInputProps } from '../types';

export type InputType = 'heading' | 'number' | 'textarea' | 'text';

export interface InlineEditProps extends Partial<ChakraEditableProps>, CommonInputProps<HTMLInputElement> {
	inputType?: InputType;
	Preview?: React.ComponentType<InlineEditPreviewProps>;
}

export interface InlineEditPreviewProps extends Partial<Omit<InlineEditProps, 'onChange' | 'onChangeValue'>> {
	fitText?: boolean;
	isEditing?: boolean;
	onRequestEdit?: VoidFunction;
}

export interface InlineEditInputProps extends Pick<InlineEditProps, 'inputType'> {
	onCancel: VoidFunction;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}
