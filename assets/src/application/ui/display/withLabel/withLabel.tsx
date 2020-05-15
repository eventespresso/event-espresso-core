import React from 'react';
import classNames from 'classnames';
import { LabelPosition, withLabelProps } from './types';
import './style.scss';

const withLabel = <P extends withLabelProps>(WrappedComponent: React.ComponentType<P>) => {

	type Ref = React.Ref<typeof WrappedComponent>;
	type refProps = { forwardedRef: Ref; };

	const WithLabel: React.FC<P & refProps> = ({
		forwardedRef,
		id,
		label,
		labelClassName,
		labelPosition = LabelPosition.TOP_LEFT,
		...props
	}) => {
		const className = classNames(
			labelClassName,
			'ee-input-label__wrapper',
			labelPosition && `ee-input-label__wrapper--${labelPosition}`
		);
		return label ? (
			<div className={ className }>
				<label className='ee-input-label' htmlFor={ id }>
					{ label }
				</label>
				<WrappedComponent { ...(props as P) } ref={ forwardedRef } />
			</div>
		) : (
				<WrappedComponent { ...(props as P) } ref={ forwardedRef } />
			);
	};

	const ForwardedComponentWithLabel = (props: P, ref: Ref) => {
		return <WithLabel { ...props } forwardedRef={ ref } />;
	};

	return React.forwardRef(ForwardedComponentWithLabel);
};

export default withLabel;
