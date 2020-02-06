import React from 'react';
import { Spinner } from '@blueprintjs/core';
import { LoadingToastProps } from './types';

const LoadingToastNotice: React.FC<LoadingToastProps> = ({ message }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexFlow: 'row nowrap',
				alignContent: 'flex-start',
				justifyContent: 'flex-start',
			}}
		>
			<Spinner size={Spinner.SIZE_SMALL} />
			<span style={{ marginLeft: '1rem' }}>{message}</span>
		</div>
	);
};

export default LoadingToastNotice;
