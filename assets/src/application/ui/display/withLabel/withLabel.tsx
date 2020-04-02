import React from 'react';
import classNames from 'classnames';
import invariant from 'invariant';
import { v4 as uuidv4 } from 'uuid';

import { isEmpty } from '@appServices/utilities/string';
import { LabelPosition, withLabelProps } from './types';
import './style.scss';

const withLabel = <P extends withLabelProps>(WrappedComponent: React.ComponentType<P>) => {
	type Ref = React.Ref<typeof WrappedComponent>;
	type refProps = { forwardedRef: Ref };
	const WithLabel: React.FC<P & refProps> = ({
		forwardedRef,
		label,
		labelClassName,
		labelPosition = LabelPosition.TOP_LEFT,
		...props
	}) => {
		const className = classNames('ee-input-label__wrapper', labelClassName, {
			// ordered clockwise starting top left
			'ee-input-label__wrapper--top-left': labelPosition === LabelPosition.TOP_LEFT,
			'ee-input-label__wrapper--top-center': labelPosition === LabelPosition.TOP_CENTER,
			'ee-input-label__wrapper--top-right': labelPosition === LabelPosition.TOP_RIGHT,
			'ee-input-label__wrapper--right-top': labelPosition === LabelPosition.RIGHT_TOP,
			'ee-input-label__wrapper--right-middle': labelPosition === LabelPosition.RIGHT_MIDDLE,
			'ee-input-label__wrapper--right-bottom': labelPosition === LabelPosition.RIGHT_BOTTOM,
			'ee-input-label__wrapper--bottom-right': labelPosition === LabelPosition.BOTTOM_RIGHT,
			'ee-input-label__wrapper--bottom-center': labelPosition === LabelPosition.BOTTOM_CENTER,
			'ee-input-label__wrapper--bottom-left': labelPosition === LabelPosition.BOTTOM_LEFT,
			'ee-input-label__wrapper--left-bottom': labelPosition === LabelPosition.LEFT_BOTTOM,
			'ee-input-label__wrapper--left-middle': labelPosition === LabelPosition.LEFT_MIDDLE,
			'ee-input-label__wrapper--left-top': labelPosition === LabelPosition.LEFT_TOP,
		});
		const labelID = props.id ? `${props.id}-label` : uuidv4();

		return label ? (
			<div className={className}>
				<label className='ee-input-label' id={labelID}>
					{label}
				</label>
				<WrappedComponent {...(props as P)} aria-labelledby={labelID} ref={forwardedRef} />
			</div>
		) : (
			<WrappedComponent {...(props as P)} aria-labelledby={labelID} ref={forwardedRef} />
		);
	};

	const ForwardedComponentWithLabel = (props: P, ref: Ref) => {
		return <WithLabel {...props} forwardedRef={ref} />;
	};

	return React.forwardRef(ForwardedComponentWithLabel);
};

export default withLabel;
