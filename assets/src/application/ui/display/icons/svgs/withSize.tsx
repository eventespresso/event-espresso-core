import React from 'react';
import classNames from 'classnames';
import { withSizeProps, IconSize } from './types';
import './style.scss';

const withSize = <P extends withSizeProps>(WrappedComponent: React.ComponentType<P>) => {
	type ISize = { size: IconSize };

	const WithSize: React.FC<P & ISize> = ({ size, ...props }) => {
		const className = classNames(props.className, size && `ee__icon--${size}`);

		return <WrappedComponent {...(props as P)} className={className} />;
	};

	return WithSize;
};

export default withSize;
