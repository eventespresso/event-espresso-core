import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
const { Paragraph, Title } = Typography;

interface InlineEditInputProps {
	as: 'p';
	defaultValue: string | number;
	value: string | number;
	[key: string]: any;
}

const InlineEditInput: React.FC<InlineEditInputProps> = ({ as, defaultValue, level, value, ...rest }) => {
	const [currentValue, setcurrentValue] = useState(defaultValue);
	useEffect(() => setcurrentValue(value), [value]);

	if (as === 'p') {
		<Paragraph editable={{ onChange: setcurrentValue }}>{currentValue}</Paragraph>;
	}

	return (
		<Title level={level} editable={{ onChange: setcurrentValue }}>
			{currentValue}
		</Title>
	);
};

export default InlineEditInput;
