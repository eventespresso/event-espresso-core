import React, { useState, useEffect } from 'react';

interface InlineEditInputProps {
	component: React.ReactType;
	defaultValue: string | number;
	value: string | number;
	[key: string]: any;
}

const InlineEditInput: React.FC<InlineEditInputProps> = ({ component: Component, defaultValue, value, ...rest }) => {
	const [currentValue, setcurrentValue] = useState(defaultValue);

	useEffect(() => setcurrentValue(value), [value]);

	return <Component value={currentValue} onChange={(newValue) => setcurrentValue(newValue)} {...rest} />;
};

export default InlineEditInput;
