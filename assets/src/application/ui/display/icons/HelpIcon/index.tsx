import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { ClickableIconWithTooltip } from '@appDisplay/Tooltip';
import { InfoCircleOutlined } from '../svgs/index';
import { IconProps } from '../types';

import './style.scss';

interface HelpIconProps extends IconProps {
    clickable?: boolean;
    tooltipText?: string;
}

const HelpIcon: React.FC<HelpIconProps> = ({ clickable, tooltipText, ...props }) => {
    const className = classNames('ee-help-icon', props.className);

    if (clickable) {
        return (
            <ClickableIconWithTooltip
                className={className}
                icon={InfoCircleOutlined}
                tooltipText={tooltipText}
            />
        );
    };

    return <InfoCircleOutlined className={className} />;
};

export default HelpIcon;
