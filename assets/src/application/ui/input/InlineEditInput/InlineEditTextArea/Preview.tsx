import React from 'react';
import Dotdotdot from 'react-dotdotdot';

import { InlineEditPreviewProps } from '@infraUI/inputs';
import TabbableText from '../TabbableText';

const Preview: React.FC<InlineEditPreviewProps> = ({ isEditing, onRequestEdit, value, ...props }) => {
	if (isEditing) {
		return null;
	}

	return (
		<Dotdotdot clamp={3}>
			<TabbableText {...props} onRequestEdit={onRequestEdit} text={value} />
		</Dotdotdot>
	);
};

export default Preview;
