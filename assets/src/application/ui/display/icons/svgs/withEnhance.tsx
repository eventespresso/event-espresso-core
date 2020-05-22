import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { camelToSnakeCase } from '@appServices/utilities/text';
import { IconProps, IconSize } from './types';

import './style.scss';

const withEnhance = <P extends IconProps>(WrappedComponent: React.ComponentType<P>) => {
	type Ref = React.Ref<typeof WrappedComponent>;
	type EnhanceProps = { forwardedRef?: Ref; noMargin?: boolean; size?: IconSize };

	// @ts-ignore
	const displayName = WrappedComponent?.render?.name;

	const generatedIconClassName = displayName && 'ee-icon--' + camelToSnakeCase(displayName.replace('Svg', ''));

	const WithEnhance: React.FC<P & EnhanceProps> = ({ forwardedRef, noMargin, size, ...props }) => {
		const className = classNames(
			'ee-svg',
			size && `ee__icon--${size}`,
			noMargin && 'ee__icon--no-margin',
			generatedIconClassName,
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
