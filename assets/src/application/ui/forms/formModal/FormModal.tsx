import React from 'react';
import { Form } from 'react-final-form';

import { FormModalProps } from './types';
import FormModalForm from './FormModalForm';

import './styles.css';

const FormModal: React.FC<FormModalProps> = ({
	FormComponent,
	initialValues,
	onSubmit,
	onClose,
	isOpen,
	...extraProps
}) => {
	const onCloseHandler = (e?: React.SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onClose();
	};
	return (
		isOpen &&
		initialValues && (
			<Form
				initialValues={initialValues}
				onSubmit={onSubmit}
				{...extraProps}
				render={({ ...formProps }) => (
					<FormModalForm {...formProps} FormComponent={FormComponent} onClose={onCloseHandler} />
				)}
			/>
		)
	);
};

export default FormModal;
