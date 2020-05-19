import React from 'react';
import classNames from 'classnames';

import { camelToSnakeCase } from '@appServices/utilities/text';
import { IconProps, IconSize } from './types';

import './style.scss';

const withEnhance = <P extends IconProps>(WrappedComponent: React.ComponentType<P>) => {
	type EnhanceProps = { noMargin?: boolean; size?: IconSize };

	// @ts-ignore
	const displayName = WrappedComponent?.render?.name;

	const generatedIconClassName = displayName && 'ee-icon--' + camelToSnakeCase(displayName.replace('Svg', ''));

	const WithEnhance: React.FC<P & EnhanceProps> = ({ noMargin, size, ...props }) => {
		const className = classNames(
			'ee-svg',
			size && `ee__icon--${size}`,
			noMargin && 'ee__icon--no-margin',
			generatedIconClassName,
			props.className
		);

		return <WrappedComponent {...(props as P)} className={className} />;
	};

	return WithEnhance;
};

export default withEnhance;
