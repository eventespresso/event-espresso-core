import React from 'react';
import { EditablePreview as ChakraEditablePreview } from '@chakra-ui/core';

import type { InlineEditPreviewProps } from './types';

const InlineEditPreview: React.FC<InlineEditPreviewProps> = ({
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

export default InlineEditPreview;
