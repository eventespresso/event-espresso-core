import React, { useCallback } from 'react';
import classNames from 'classnames';

import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { InlineEdit, InlineEditPreviewProps } from '@infraUI/inputs';
import { isInfinite } from '@application/services';

import TabbableText from './TabbableText'
import { TextProps } from './types';

const Preview: React.FC<InlineEditPreviewProps> = ({ value, onRequestEdit, isEditing, ...props }) => {
	const isInfinity = isInfinite(value);
	const className = classNames('ee-inline-edit__infinity', {
		'ee-infinity-sign': isInfinity,
	});

	if (isEditing) {
		return null;
	}

	const output = isInfinity ? '∞' : value;

	return <TabbableText {...props} className={className} onRequestEdit={onRequestEdit} text={output} />;
};

const InlineEditInfinity: React.FC<TextProps> = ({ onChangeValue, value, ...props }) => {
    const isInfinity = isInfinite(value);

    const onChangeHandler = useCallback<TextProps['onChangeValue']>(
        (val) => {
            const parsedValue = parseInfinity(val);
            if (typeof onChangeValue === 'function') {
                onChangeValue(parsedValue);
            }
        },
        [onChangeValue]
    );

    return (
        <InlineEdit
            {...props}
            inputType='number'
            onChangeValue={onChangeHandler}
            Preview={Preview}
            value={isInfinity ? '' : value}
        />
    );
};

export default InlineEditInfinity;
