import React from 'react';
import { ENTER } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';

import { Tooltip } from '@infraUI/display';
import { TabbableTextProps } from './types';

import './style.scss'

const TabbableText: React.FC<TabbableTextProps> = ({ onClick, text }) => {
    const onKeyDown = (e) => {
        if (e.keyCode === ENTER) {
            onClick();
        }
    };

    return (
        <Tooltip tooltip={__('Click to edit')}>
            <span className="ee-tabbable-text" onClick={onClick} onKeyDown={onKeyDown} tabIndex={0}>{text}</span>
        </Tooltip>
    );
};

export default TabbableText;
