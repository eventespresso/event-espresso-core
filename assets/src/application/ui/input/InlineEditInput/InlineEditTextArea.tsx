import React from 'react';
import Dotdotdot from 'react-dotdotdot';

import { InlineEdit, InlineEditPreviewProps } from '@infraUI/inputs';

import TabbableText from './TabbableText'
import { TextAreaProps } from './types';

const Preview: React.FC<InlineEditPreviewProps> = ({ isEditing, onRequestEdit, value, }) => {
	if (isEditing) {
		return null;
	}

	return (
		<Dotdotdot clamp={3}>
			<TabbableText onRequestEdit={onRequestEdit} text={value} />
		</Dotdotdot>
	);
};

const InlineEditTextArea: React.FC<TextAreaProps> = ({ tooltip, ...props }) => {
	const preview = previewProps => <Preview {...previewProps} tooltip={tooltip} />
	return <InlineEdit placeholder='' {...props} inputType='textarea' Preview={preview} />;
};

export default InlineEditTextArea;
