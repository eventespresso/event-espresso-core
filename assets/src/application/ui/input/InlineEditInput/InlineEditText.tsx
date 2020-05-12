import React from 'react';
import Dotdotdot from 'react-dotdotdot';

import { Textfit } from 'react-textfit';

import { TextProps } from './types';
import { InlineEdit, InlineEditPreviewProps } from '@infraUI/inputs';

const Preview: React.FC<InlineEditPreviewProps> = ({ value, onRequestEdit, isEditing }) => {
	if (isEditing) {
		return null;
	}

	if (value.length > 50) {
		return (
			<Dotdotdot clamp={2}>
				<span onClick={onRequestEdit}>{value}</span>
			</Dotdotdot>
		);
	}

	return (
		<Textfit
			max={24} // based on --ee-font-size-bigger: 1.5rem;
			mode='single'
		>
			<span onClick={onRequestEdit}>{value}</span>
		</Textfit>
	);
};

const InlineEditText: React.FC<TextProps> = ({ placeholder = '', tag: as, ...props }) => {
	return <InlineEdit {...props} as={as} inputType='text' placeholder={placeholder} Preview={Preview} />;
};

export default InlineEditText;
