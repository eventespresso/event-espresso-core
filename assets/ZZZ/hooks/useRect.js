import { useLayoutEffect, useCallback, useState } from 'react';
const { addEventListener, removeEventListener } = window;

const useRect = ( ref ) => {
	const [ rect, setRect ] = useState( getRect( ref ? ref.current : null ) );

	const handleResize = useCallback( () => {
		if ( ! ref.current ) {
			return;
		}

		// Update client rect
		setRect( getRect( ref.current ) );
	}, [ ref ] );

	useLayoutEffect( () => {
		const element = ref.current;
		if ( ! element ) {
			return;
		}

		handleResize();
		// eslint-disable-next-line
		if ( ResizeObserver && typeof ResizeObserver === 'function' ) {
			// eslint-disable-next-line
			let resizeObserver = new ResizeObserver( () => handleResize() );
			resizeObserver.observe( element );

			return () => {
				if ( ! resizeObserver ) {
					return;
				}
				resizeObserver.disconnect();
				resizeObserver = null;
			};
		}
		// Browser support, remove freely
		addEventListener( 'resize', handleResize );

		return () => {
			removeEventListener( 'resize', handleResize );
		};
	}, [ ref.current ] );

	return rect;
};

function getRect( element ) {
	if ( ! element ) {
		return {
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0,
		};
	}

	return element.getBoundingClientRect();
}

export default useRect;
