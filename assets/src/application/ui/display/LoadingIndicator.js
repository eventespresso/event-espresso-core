/**
 * External dependencies
 */
import React from 'react';
import { Callout, H6, Spinner } from '@blueprintjs/core/lib/cjs';

export const boxStyle = {
	padding: '2rem',
	textAlign: 'center',
	width: '100%',
};

export const hdrStyle = {
	color: 'grey',
	margin: '1rem 0 0',
};

const LoadingIndicator = ({ message }) => (
	<>
		<Callout style={boxStyle}>
			<Spinner size={Spinner.SIZE_SMALL} />
			<H6 style={hdrStyle}>{message}</H6>
		</Callout>
	</>
);

export default LoadingIndicator;
