import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { Collapse } from '@infraUI/display';

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
	const buttonText = show ? __('Hide Debug Info') : __('Show Debug Info');
	const handleToggle = useCallback(() => setShow(!show), [show]);

	return (
		<>
			<Button buttonText={buttonText} onClick={handleToggle} />
			<Collapse isOpen={show}>{output}</Collapse>
		</>
	);
};

export default DebugInfo;
