import React from 'react';
import Dotdotdot from 'react-dotdotdot';
import { __ } from '@wordpress/i18n';

import { InlineEdit, InlineEditPreviewProps } from '@infraUI/inputs';
import { TextFit } from '@infraUI/layout/textfit';

import TabbableText from './TabbableText'
import { TextProps } from './types';

const Preview: React.FC<InlineEditPreviewProps> = ({ fitText, isEditing, onRequestEdit, value }) => {
	if (isEditing) {
		return null;
	}

	const textInput = <TabbableText onRequestEdit={onRequestEdit} text={value} />;

	if (value.length > 30) {
		return <Dotdotdot clamp={2}>{textInput}</Dotdotdot>;
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

const InlineEditText: React.FC<TextProps> = ({ fitText = true, placeholder = '', tag: as, ...props }) => {
	return (
		<InlineEdit
			{...props}
			as={as}
			inputType='text'
			placeholder={placeholder}
			Preview={(previewProps) => <Preview {...previewProps} fitText={fitText} />}
		/>
	);
};

export default InlineEditText;
