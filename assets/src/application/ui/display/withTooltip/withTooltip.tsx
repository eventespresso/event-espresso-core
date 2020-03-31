import React from 'react';
import classNames from 'classnames';
import { Tooltip as DefaultTooltip } from 'antd';
import { __ } from '@wordpress/i18n';
import { isEmpty } from '@appServices/utilities/string';
import { withTooltipProps } from './types';

import './style.scss';

const withTooltip = <P extends withTooltipProps>(WrappedComponent: React.ComponentType<P>) => {
	type Ref = React.Ref<typeof WrappedComponent>;
	type refProps = { forwardedRef: Ref };
	const WithTooltip: React.ComponentType<P & refProps> = ({
		buttonText,
		forwardedRef,
		showTooltipOnMobile = false,
		tooltip,
		tooltipProps,
		...props
	}) => {
		const ariaLabel = isEmpty(buttonText) && !isEmpty(tooltip) ? tooltip : null;
		let toolTipped: React.ReactElement;
		if (showTooltipOnMobile) {
			const className = classNames({
				'ee-mobile-help-text': true,
				'ee-mobile-help-text--short': tooltip.length < 25,
				'ee-mobile-help-text--long': tooltip.length > 50,
			});
			tooltipProps = { ...tooltipProps, overlayClassName: 'ee-mobile-help-text__tooltip' };
			toolTipped = (
				<div className='ee-mobile-help-text__btn-wrap'>
					<WrappedComponent
						{...(props as P)}
						aria-label={ariaLabel}
						buttonText={buttonText}
						ref={forwardedRef}
						tooltip={tooltip}
					/>
					<div className={className}>{tooltip}</div>
				</div>
			);
		} else {
			toolTipped = (
				<WrappedComponent
					{...(props as P)}
					aria-label={ariaLabel}
					buttonText={buttonText}
					ref={forwardedRef}
					tooltip={tooltip}
				/>
			);
		}
		return (
			<DefaultTooltip {...tooltipProps} title={tooltip}>
				{toolTipped}
			</DefaultTooltip>
		);
	};

	const ForwardedComponentWithTooltip = (props: P, ref: Ref) => {
		return <WithTooltip {...props} forwardedRef={ref} />;
	};

	return React.forwardRef(ForwardedComponentWithTooltip);
};

export default withTooltip;
