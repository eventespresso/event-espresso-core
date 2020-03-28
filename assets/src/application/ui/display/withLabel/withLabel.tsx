import React from 'react';
import classNames from 'classnames';
import { withLabelProps } from './types';
import './style.scss';

const withLabel = <T extends React.ComponentType, P extends withLabelProps>(
	WrappedComponent: React.ComponentType<P>
) => {
	type refProps = { forwardedRef: React.RefObject<T> };
	const WithLabel: React.FC<P & refProps> = ({
		forwardedRef,
		id,
		label,
		labelClassName,
		labelPosition = 'top',
		...props
	}) => {
		const className = classNames('ee-input-label__wrapper', labelClassName, {
			'ee-input-label__wrapper--bottom': labelPosition === 'bottom',
			'ee-input-label__wrapper--left': labelPosition === 'left',
			'ee-input-label__wrapper--right': labelPosition === 'right',
			'ee-input-label__wrapper--top': labelPosition === 'top',
		});
		return label ? (
			<div className={className}>
				<label className='ee-input-label' htmlFor={id}>
					{label}
				</label>
				<WrappedComponent {...(props as P)} ref={forwardedRef} />
			</div>
		) : (
			<WrappedComponent {...(props as P)} ref={forwardedRef} />
		);
	};

	const ForwardedComponentWithLabel = (props: P, ref: T) => {
		return <WithLabel {...props} forwardedRef={ref} />;
	};

	return React.forwardRef<T, P>(ForwardedComponentWithLabel as any);
};

export default withLabel;
