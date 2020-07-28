import React from 'react';
import Dotdotdot from 'react-dotdotdot';

import { PreviewProps } from '@infraUI/inputs';
import { TextFit } from '@infraUI/layout/textfit';

import TabbableText from './TabbableText';

const Preview: React.FC<PreviewProps> = ({
	fitText,
	isEditing,
	lineCount,
	lineLength = 25,
	onRequestEdit,
	tooltip,
	value,
}) => {
	if (isEditing) {
		return null;
	}

	const textInput = <TabbableText onRequestEdit={onRequestEdit} text={value} tooltip={tooltip} />;

	if (lineCount && value.length > lineLength) {
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
