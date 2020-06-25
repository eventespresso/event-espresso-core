import React from 'react';
import classNames from 'classnames';
import { ENTER } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';

import { Tooltip } from '@infraUI/display';
import { TabbableTextProps } from './types';

import './style.scss'

const TabbableText: React.FC<TabbableTextProps> = ({ onRequestEdit, icon, text, ...props }) => {
    const className = classNames('ee-tabbable-text', props.className);

    const onKeyDown = (e) => {
        if (e.keyCode === ENTER) {
            onRequestEdit();
        }
    };

    return (
        <Tooltip tooltip={__('Click to edit')}>
            <span
                className={className}
                onClick={onRequestEdit}
                onKeyDown={onKeyDown}
                tabIndex={0}
            >
                {icon && icon}
                {text && text}
            </span>
        </Tooltip>
    );
};

export default TabbableText;
