import React from 'react';
import { EditablePreview as ChakraEditablePreview } from '@chakra-ui/core';

import type { EditablePreviewProps } from './types';

const EditablePreview: React.FC<EditablePreviewProps> = ({
	inputType,
	isEditing,
	onRequestEdit,
	Preview,
	value,
	...props
}) => {
	return Preview ? (
		<Preview {...props} isEditing={isEditing} onRequestEdit={onRequestEdit} value={value} />
	) : (
		<ChakraEditablePreview />
	);
};

export default EditablePreview;
