import React, { useCallback, useEffect, useState } from 'react';
import { Editable as ChakraEditable } from '@chakra-ui/core';

import type { EditableProps } from './types';
import EditableInput from './EditableInput';
import EditablePreview from './EditablePreview';
import { usePrevious } from '@appServices/utilities';

const Editable: React.FC<EditableProps> = ({ onChangeValue, value, defaultValue, ...props }) => {
	const [currentValue, setCurrentValue] = useState(defaultValue || value);
	const [prevSubmitValue, setPrevSubmitValue] = useState(currentValue);

	const previousValue = usePrevious(value);

	useEffect(() => {
		// update value if updated from consumer
		if (value !== previousValue) {
			setCurrentValue(value);
			setPrevSubmitValue(value);
		}
	}, [value]);

	const onSubmitHandler = useCallback<EditableProps['onSubmit']>(() => {
		// Update the curerntly submitted value
		setPrevSubmitValue(currentValue);

		if (typeof onChangeValue === 'function') {
			onChangeValue(currentValue);
		}
	}, [currentValue, onChangeValue]);

	return (
		<ChakraEditable {...props} onChange={setCurrentValue} onSubmit={onSubmitHandler} value={currentValue}>
			{({ isEditing, onCancel, onRequestEdit }) => {
				const onCancelEdit = useCallback(() => {
					onCancel();
					// reset current value to what it was earlier
					setCurrentValue(prevSubmitValue);
				}, [onCancel, prevSubmitValue]);

				return (
					<>
						<EditablePreview
							{...props}
							isEditing={isEditing}
							onRequestEdit={onRequestEdit}
							value={currentValue}
						/>
						<EditableInput inputType={props.inputType} setValue={setCurrentValue} onCancel={onCancelEdit} />
					</>
				);
			}}
		</ChakraEditable>
	);
};

export default Editable;
