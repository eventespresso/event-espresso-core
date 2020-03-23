import React, { CSSProperties } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const dataStyle: CSSProperties = {
	borderRadius: '5px',
	boxSizing: 'border-box',
	padding: '1em 2em',
	color: '#a9ce47',
	backgroundColor: '#26203d',
};

interface DebugInfoProps {
	data: any;
	asJson?: boolean;
	asCollapse?: boolean;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ data, asJson = true, asCollapse = true }) => {
	const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

	if (!isDev) {
		return null;
	}

	const dataToRender = asJson ? JSON.stringify(data, null, 2) : data;

	const output = <pre style={dataStyle}>{dataToRender}</pre>;

	if (!asCollapse) {
		return output;
	}

	return (
		<Collapse>
			<Panel header='Debug Info' key='debug-info'>
				{output}
			</Panel>
		</Collapse>
	);
};

export default DebugInfo;
