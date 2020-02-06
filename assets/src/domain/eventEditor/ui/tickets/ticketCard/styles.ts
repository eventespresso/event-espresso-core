import { CSSProperties } from 'react';

export const cardStyle: CSSProperties = {
	margin: '0 0 2rem',
	minWidth: '360px',
	position: 'relative' as 'relative', // cast value to type
	textAlign: 'center',
	width: '32%',
};

export const btnsStyle: CSSProperties = {
	bottom: '.5rem',
	position: 'absolute' as 'absolute',
	right: '.5rem',
	textAlign: 'right',
};

export const idStyle: CSSProperties = {
	color: 'grey',
	fontSize: '9px',
	left: '.75em',
	position: 'absolute' as 'absolute',
	top: '.5em',
};

export const priceStyle: CSSProperties = {
	color: 'grey',
};
