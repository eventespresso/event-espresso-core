import React from 'react';
import Dotdotdot from 'react-dotdotdot';

import { Textfit } from 'react-textfit';

import { TextProps } from './types';
import { InlineEdit, InlineEditPreviewProps } from '@infraUI/inputs';

const Preview: React.FC<InlineEditPreviewProps> = ({ fitText, isEditing, onRequestEdit, value }) => {
	if (isEditing) {
		return null;
	}

	if (value.length > 30) {
		return (
			<Dotdotdot clamp={2}>
				<span onClick={onRequestEdit}>{value}</span>
			</Dotdotdot>
		);
	}

	if (fitText) {
		return (
			<Textfit
				max={24} // based on --ee-font-size-bigger: 1.5rem;
				min={18}
				mode='single'
			>
				<span onClick={onRequestEdit}>{value}</span>
			</Textfit>
		);
	}

	return <span onClick={onRequestEdit}>{value}</span>;
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
