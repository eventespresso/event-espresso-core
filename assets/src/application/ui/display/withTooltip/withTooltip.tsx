import React from 'react';
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
		showOnMobile = false,
		tooltip,
		tooltipProps,
		...props
	}) => {
		const ariaLabel = isEmpty(buttonText) && !isEmpty(tooltip) ? tooltip : null;
		const toolTipped = showOnMobile ? (
			<div className='ee-mobile-help-text__btn-wrap'>
				<WrappedComponent {...(props as P)} aria-label={ariaLabel} ref={forwardedRef} tooltip={tooltip} />
				<div className='ee-mobile-help-text'>{tooltip}</div>
			</div>
		) : (
			<WrappedComponent {...(props as P)} aria-label={ariaLabel} ref={forwardedRef} tooltip={tooltip} />
		);
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
