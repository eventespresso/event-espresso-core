import React from 'react';

import { InputWithLabel as InputWithLabelAdapter } from '@infraUI/inputs';
import './style.scss';

interface InputWithLabel {
	label: React.ReactNode;
	labelPosition: 'left' | 'right';
}

const InputWithLabel: React.FC<InputWithLabel> = ({ children, label, labelPosition = 'right' }) => {
	const leftLabel = labelPosition === 'left' && label;
	const rightLabel = labelPosition === 'right' && label;

	return (
		<InputWithLabelAdapter className='ee-input-with-label' leftLabel={leftLabel} rightLabel={rightLabel}>
			{children}
		</InputWithLabelAdapter>
	);
};

export default InputWithLabel;
