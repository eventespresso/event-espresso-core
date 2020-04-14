import React from 'react';
import {
	ButtonGroup,
	Editable as ChakraEditable,
	EditableInput,
	EditablePreview,
	IconButton,
	Flex,
} from '@chakra-ui/core';

import { EditableProps } from './types';

const EditableControls = ({ isEditing, onSubmit, onCancel, onRequestEdit }) => {
	return isEditing ? (
		<ButtonGroup justifyContent='center' size='sm'>
			<IconButton aria-label='' icon='check' onClick={onSubmit} />
			<IconButton aria-label='' icon='close' onClick={onCancel} />
		</ButtonGroup>
	) : (
		<Flex justifyContent='center'>
			<IconButton aria-label='' size='sm' icon='edit' onClick={onRequestEdit} />
		</Flex>
	);
};

const EditableWithCustomControls: React.FC<EditableProps> = (props) => {
	return (
		<ChakraEditable {...props} textAlign='center' fontSize='2xl' isPreviewFocusable={false} submitOnBlur={false}>
			{(controlsProps) => (
				<>
					<EditablePreview />
					<EditableInput />
					<EditableControls {...controlsProps} />
				</>
			)}
		</ChakraEditable>
	);
};

export default EditableWithCustomControls;
