import React, { useEffect } from 'react';

/**
 * utility hook for setting focus to an HTML element when the component that renders it mounts
 */
const useFocusOnMount = <T extends React.ComponentType>(focusOnMount: boolean, ref: React.RefObject<T>): void => {
	useEffect(() => {
		if (!focusOnMount) {
			return;
		}
		const timeout = setTimeout(() => {
			console.log('');
			console.log('%c MenuItem useEffect()', 'color: MediumSlateBlue;');
			console.log('%c 	focusOnMount', 'color: MediumSlateBlue;', focusOnMount);
			console.log('%c 	ref', 'color: MediumSlateBlue;', ref);
			if (ref.current) {
				ref.current.focus();
			}
		}, 1);
		return (): void => clearTimeout(timeout);
	}, []);
};

export default useFocusOnMount;
