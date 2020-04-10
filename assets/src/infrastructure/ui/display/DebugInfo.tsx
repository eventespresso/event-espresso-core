import React, { useCallback } from 'react';
import { Button, Collapse } from '@chakra-ui/core';
import styled from '@emotion/styled';

const Pre = styled.pre`
	border-radius: 5px;
	box-sizing: border-box;
	padding: 1em 2em;
	color: #a9ce47;
	background-color: #26203d;
`;

interface DebugInfoProps {
	data: any;
	asJson?: boolean;
	asCollapse?: boolean;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ data, asJson = true, asCollapse = true }) => {
	const [show, setShow] = React.useState(false);
	const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

	if (!isDev) {
		return null;
	}

	const dataToRender = asJson ? JSON.stringify(data, null, 2) : data;

	const output = <Pre>{dataToRender}</Pre>;

	if (!asCollapse) {
		return output;
	}

	const handleToggle = useCallback(() => setShow(!show), [show]);

	return (
		<>
			<Button size='sm' onClick={handleToggle} mt='1rem'>
				{show ? 'Hide' : 'Show'} Debug Info
			</Button>
			<Collapse mt={4} isOpen={show}>
				{output}
			</Collapse>
		</>
	);
};

export default DebugInfo;
