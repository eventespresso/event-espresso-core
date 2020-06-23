import React from 'react';
import { ENTER } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';

import { Tooltip } from '@infraUI/display';
import { TabbableTextProps } from './types';

import './style.scss'

const TabbableText: React.FC<TabbableTextProps> = ({ onRequestEdit, text }) => {
    const onKeyDown = (e) => {
        if (e.keyCode === ENTER) {
            onRequestEdit();
        }
    };

    return (
        <Tooltip tooltip={__('Click to edit')}>
            <span className="ee-tabbable-text" onClick={onRequestEdit} onKeyDown={onKeyDown} tabIndex={0}>{text}</span>
        </Tooltip>
    );
};

export default TabbableText;
