import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { isEmpty } from '@appServices/utilities/string';
import { Tooltip, TooltipProps } from '@infraUI/display';
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
		...props
	}) => {
		const ariaLabel = isEmpty(buttonText as string) && !isEmpty(tooltip) ? tooltip : null;
		const noTooltip = isEmpty(buttonText as string) && isEmpty(tooltip);
		const title = tooltip || (buttonText as string);

		let toolTipped: React.ReactElement;
		let tooltipProps: TooltipProps;

		if (noTooltip) {
			return <WrappedComponent {...(props as P)} ref={forwardedRef} />;
		}

		if (showTooltipOnMobile) {
			const className = classNames({
				'ee-mobile-help-text': true,
				'ee-mobile-help-text--short': tooltip.length < 25,
				'ee-mobile-help-text--long': tooltip.length > 50,
			});
			tooltipProps = { ...props.tooltipProps, overlayClassName: 'ee-mobile-help-text__tooltip' };
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

		console.log('title', title);

		return (
			<Tooltip {...tooltipProps} title={title}>
				{toolTipped}
			</Tooltip>
		);
	};

	const ForwardedComponentWithTooltip = (props: P, ref: Ref) => {
		return <WithTooltip {...props} forwardedRef={ref} />;
	};

	return React.forwardRef(ForwardedComponentWithTooltip);
};

export default withTooltip;
