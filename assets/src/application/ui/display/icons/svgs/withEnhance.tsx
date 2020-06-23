import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { HorizontalMargin, IconProps, IconSize } from './types';

import './style.scss';

const withEnhance = <P extends IconProps>(WrappedComponent: React.ComponentType<P>) => {
	type Ref = React.Ref<typeof WrappedComponent>;
	type EnhanceProps = { forwardedRef?: Ref; horizontalMargin?: HorizontalMargin, noMargin?: boolean; size?: IconSize };

	const WithEnhance: React.FC<P & EnhanceProps> = ({ forwardedRef, horizontalMargin = "micro", noMargin, size, ...props }) => {
		const className = classNames(
			'ee-svg',
			!noMargin && horizontalMargin && `ee-horizontal-margin--${horizontalMargin}`,
			noMargin && 'ee-icon--no-margin',
			size && `ee-icon--${size}`,
			props.className
		);

		return <WrappedComponent {...(props as P)} className={className} ref={forwardedRef} />;
	};

	const ForwardedComponentWithEnhance = (props: P & EnhanceProps, ref: Ref) => {
		return <WithEnhance {...props} forwardedRef={ref} />;
	};

	return forwardRef(ForwardedComponentWithEnhance);
};

export default withEnhance;
