import React from 'react';
import Dotdotdot from 'react-dotdotdot';

import { InlineEditPreviewProps } from '@infraUI/inputs';
import { TextFit } from '@infraUI/layout/textfit';

import TabbableText from '../TabbableText';

const Preview: React.FC<InlineEditPreviewProps> = ({
	fitText,
	isEditing,
	lineCount,
	onRequestEdit,
	tooltip,
	value,
}) => {
	if (isEditing) {
		return null;
	}

	const textInput = <TabbableText onRequestEdit={onRequestEdit} text={value} tooltip={tooltip} />;

	if (lineCount && value.length > 25) {
		return <Dotdotdot clamp={lineCount}>{textInput}</Dotdotdot>;
	}

	if (fitText) {
		return (
			<TextFit
				max={24} // based on --ee-font-size-bigger: 1.5rem;
				min={18}
				mode='single'
			>
				{textInput}
			</TextFit>
		);
	}

	return textInput;
};

export default Preview;
