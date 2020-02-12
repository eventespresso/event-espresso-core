import React, { CSSProperties } from 'react';
import { Form } from 'react-final-form';
import { Modal } from 'antd';

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
	const modalStyle: CSSProperties = {
		boxSizing: 'border-box',
		maxHeight: '90%',
		maxWidth: '1200px',
		minHeight: '50%',
		minWidth: '320px',
		width: '80%',
		overflowY: 'scroll',
		position: 'absolute' as 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	};

	const onCloseHandler = (e?: React.SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onClose();
	};

	return (
		isOpen &&
		initialValues && (
			<Modal visible={isOpen} onOk={onCloseHandler} style={modalStyle}>
				<Form
					initialValues={initialValues}
					onSubmit={onSubmit}
					{...extraProps}
					render={({ ...formProps }) => (
						<FormModalForm {...formProps} FormComponent={FormComponent} onClose={onCloseHandler} />
					)}
				/>
			</Modal>
		)
	);
};

export default FormModal;
