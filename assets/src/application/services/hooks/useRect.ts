import React, { useLayoutEffect, useCallback, useState } from 'react';
const { addEventListener, removeEventListener } = window;

import getHTMLElementClientRect from '../utilities/dom/getHTMLElementClientRect';

type voidFn = () => void;

const useRect = (ref: React.RefObject<HTMLElement>): ClientRect => {
	const [rect, setRect] = useState(getHTMLElementClientRect(ref ? ref.current : null));

	const handleResize: voidFn = useCallback(() => {
		if (!ref.current) {
			return;
		}
		// Update client rect
		setRect(getHTMLElementClientRect(ref.current));
	}, [ref]);

	useLayoutEffect((): voidFn => {
		const element = ref.current;
		if (!element) {
			return;
		}

		handleResize();
		// eslint-disable-next-line
		if (ResizeObserver && typeof ResizeObserver === 'function') {
			// eslint-disable-next-line
			let resizeObserver = new ResizeObserver(() => handleResize());
			resizeObserver.observe(element);

			return () => {
				if (!resizeObserver) {
					return;
				}
				resizeObserver.disconnect();
				resizeObserver = null;
			};
		}
		// Browser support, remove freely
		addEventListener('resize', handleResize);

		return (): void => {
			removeEventListener('resize', handleResize);
		};
	}, [ref.current]);

	return rect;
};

export default useRect;
