import React from 'react';

const { console } = window;

export type ClickEvent = React.KeyboardEvent | React.MouseEvent;

interface CancelClickInterface {
	(click: ClickEvent, source?: string): void;
}

/**
 * utility for blocking click events
 * and displaying debug data in dev environments
 */
export const cancelClickEvent: CancelClickInterface = (click, source = ''): void => {
	if (click && typeof click.preventDefault === 'function') {
		click.preventDefault();
		click.stopPropagation();
		if (source !== '') {
			console.log('%c >> CLICK <<', 'font-size: 13px; color: yellow;', source, click);
		}
	}
};
