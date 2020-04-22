import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';

import getAnimation from './utilities/getAnimation';
import getToastContainerStyle from './utilities/getToastContainerStyle';
import { PositionsType, ToastProps, WithAnimationProps } from './types';
import useTimeout from '../utilities/useTimeout';

/**
 * adapted from:
 * @link https://github.com/bmcmahen/toasted-notes/blob/master/src/Alert/Message.ts
 */
const withAnimation = (Toast: React.FC<ToastProps>): React.FC<WithAnimationProps> => {
	const WithAnimation: React.FC<WithAnimationProps> = ({
		position,
		onRequestRemove,
		requestClose = false,
		duration = 30000,
		...toastProps
	}) => {
		const container = useRef<HTMLDivElement | null>(null);
		const [timeout, setTimeout] = useState(duration);
		const [display, setDisplay] = useState(true);

		const onMouseEnter = (): void => {
			setTimeout(null);
		};

		const onMouseLeave = (): void => {
			setTimeout(duration);
		};

		const onRemove = (): void => {
			if (!display) {
				onRequestRemove();
			}
		};

		const close = (): void => {
			setDisplay(false);
		};

		const animation = getAnimation({ container, onRest: onRemove, position });
		const transition = useTransition(display, null, animation);
		const style = useMemo(() => getToastContainerStyle(position), [position]);

		useTimeout(close, timeout);

		useEffect((): void => {
			if (requestClose) {
				setDisplay(false);
			}
		}, [requestClose]);

		const transitionResults = transition.map(
			({ key, item, props }) =>
				item && (
					<animated.div
						key={key}
						className='ee-animated-toast__container'
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						style={{
							opacity: props.opacity,
							height: props.height,
							...style,
						}}
					>
						<animated.div
							style={{
								transform: props.transform,
								pointerEvents: 'auto',
							}}
							ref={container}
							className='ee-animated-toast__wrapper'
						>
							<Toast position={position as PositionsType} style={props} {...toastProps} />
						</animated.div>
					</animated.div>
				)
		);

		return <React.Fragment>{transitionResults}</React.Fragment>;
	};

	return WithAnimation;
};

export default withAnimation;
