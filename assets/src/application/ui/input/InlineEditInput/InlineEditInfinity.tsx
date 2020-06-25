import React, { useCallback } from 'react';
import classNames from 'classnames';

import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { Infinity } from '@appDisplay/icons/svgs';
import { InlineEdit, InlineEditPreviewProps } from '@infraUI/inputs';
import { isInfinite } from '@application/services';

import TabbableText from './TabbableText'
import { TextProps } from './types';

const Preview: React.FC<InlineEditPreviewProps> = ({ value, onRequestEdit, isEditing }) => {
	const isInfinity = isInfinite(value);
	const className = classNames('ee-inline-edit__infinity', {
		'ee-infinity-sign': isInfinity,
	});

	if (isEditing) {
		return null;
	}

	return <TabbableText className={className} icon={isInfinity && <Infinity />} onRequestEdit={onRequestEdit} text={!isInfinity && value} />;
};

const InlineEditInfinity: React.FC<TextProps> = ({ onChangeValue, value, ...rest }) => {
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
			{...rest}
			inputType='number'
			onChangeValue={onChangeHandler}
			Preview={Preview}
			value={isInfinity ? '' : value}
		/>
	);
};

export default InlineEditInfinity;
