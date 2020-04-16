/**
 * adapted from:
 * @link https://github.com/bmcmahen/toasted-notes/blob/master/src/Alert/Message.ts
 */
const getAnimation = ({ container, onRest, position }): any => {
	const isFromTop = position === 'top-left' || position === 'top-right' || position === 'top';
	return {
		config: { mass: 1, tension: 185, friction: 26 },
		from: {
			opacity: 1,
			height: 0,
			transform: `translateY(${isFromTop ? '-100%' : 0}) scale(1)`,
		},
		enter: (): Function => (next: any): void =>
			next({
				opacity: 1,
				height: container?.current?.getBoundingClientRect()?.height,
				transform: `translateY(0) scale(1)`,
			}),
		leave: {
			opacity: 0,
			height: 0,
			transform: `translateY(0 scale(0.9)`,
		},
		onRest,
	};
};

export default getAnimation;
