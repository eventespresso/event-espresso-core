import { useState, useEffect } from '@wordpress/element';

const InlineEditInput = ({ value, defaultValue, component: Component, ...rest }) => {
	const [currentValue, setcurrentValue] = useState(defaultValue);

	useEffect(() => setcurrentValue(value), [value]);

	return <Component value={currentValue} onChange={(newValue) => setcurrentValue(newValue)} {...rest} />;
};

export default InlineEditInput;
