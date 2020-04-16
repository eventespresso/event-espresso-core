import { PositionsType } from '../types';

/**
 * adapted from:
 * @link https://github.com/bmcmahen/toasted-notes/blob/master/src/Alert/ToastManager.ts
 */
const getToasterPositionStyle = (position: PositionsType): React.CSSProperties => {
	const style: React.CSSProperties = {
		maxWidth: '560px',
		position: 'fixed',
		zIndex: 5500,
		pointerEvents: 'none',
	};

	if (position === 'top' || position === 'bottom') {
		style.margin = '0 auto';
		style.textAlign = 'center';
	}

	if (position.includes('top')) {
		style.top = 0;
	}

	if (position.includes('bottom')) {
		style.bottom = 0;
	}

	if (!position.includes('left')) {
		style.right = 0;
	}

	if (!position.includes('right')) {
		style.left = 0;
	}

	return style;
};

export default getToasterPositionStyle;
