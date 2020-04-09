import React, { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { SaveOutlined } from '@ant-design/icons';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@infraUI/layout/modal';
import { Button, ButtonProps } from '@infraUI/inputs';

import { RenderModalFormProps } from './types';

const RenderModalForm: React.FC<RenderModalFormProps> = ({
	form,
	submitting,
	hasValidationErrors,
	hasSubmitErrors,
	pristine,
	onClose,
	children,
	title,
}) => {
	const submitDisabled = submitting || pristine || hasValidationErrors || hasSubmitErrors;

	const onSubmit = useCallback(
		(click) => {
			click.preventDefault();
			form.submit();
			onClose(click);
		},
		[form.submit, onClose]
	);

	const onReset = useCallback(() => form.reset(), [form.reset]);

	const submitButton: ButtonProps = useMemo(
		() => ({
			isDisabled: submitDisabled,
			type: 'submit',
			isLoading: submitting,
			leftIcon: () => <SaveOutlined />,
			onClick: onSubmit,
			buttonText: __('Submit'),
		}),
		[submitDisabled, submitting, onSubmit]
	);

	const resetButton: ButtonProps = useMemo(
		() => ({
			isDisabled: submitting || pristine,
			type: 'reset',
			onClick: onReset,
			buttonText: __('Reset'),
		}),
		[submitting, pristine, onReset]
	);

	return (
		<Modal isOpen={true} onClose={onClose} isCentered scrollBehavior='inside' size='xl'>
			<ModalOverlay />
			<ModalContent className='ee-modal-form'>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />

				<ModalBody className='form-body'>{children}</ModalBody>

				<ModalFooter>
					<Button mr={3} {...resetButton} />
					<Button variantColor='blue' {...submitButton} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default RenderModalForm;
