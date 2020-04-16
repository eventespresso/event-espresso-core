import React from 'react';
import { PositionsType } from '../types';

/**
 * adapted from:
 * @link https://github.com/bmcmahen/toasted-notes/blob/master/src/Alert/Message.ts
 */
const getToastContainerStyle = (position: PositionsType): React.CSSProperties => {
	const style: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};

	if (position.includes('right')) {
		style.alignItems = 'flex-end';
	} else if (position.includes('left')) {
		style.alignItems = 'flex-start';
	}

	return style;
};

export default getToastContainerStyle;
