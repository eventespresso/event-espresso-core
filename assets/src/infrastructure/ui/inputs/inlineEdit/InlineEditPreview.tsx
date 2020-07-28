import React from 'react';
import { EditablePreview as ChakraEditablePreview } from '@chakra-ui/core';

import type { PreviewProps } from './types';

const InlineEditPreview: React.FC<PreviewProps> = ({ isEditing, onRequestEdit, Preview, value, ...props }) => {
	return Preview ? (
		<Preview {...props} isEditing={isEditing} onRequestEdit={onRequestEdit} value={value} />
	) : (
		<ChakraEditablePreview />
	);
};

export default InlineEditPreview;
