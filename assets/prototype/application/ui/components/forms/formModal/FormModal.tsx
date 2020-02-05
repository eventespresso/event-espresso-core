import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { Form } from 'react-final-form';
import { Classes, Overlay } from '@blueprintjs/core/lib/esm';

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
	const overlayProps = {
		autoFocus: true,
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		hasBackdrop: true,
		usePortal: true,
		useTallContent: false,
		portalClassName: 'ee-form-modal',
	};

	const classes = classNames(Classes.CARD, Classes.ELEVATION_4);

	const overlayStyle: CSSProperties = {
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
		initialValues && (
			<Overlay {...overlayProps} className={Classes.OVERLAY_SCROLL_CONTAINER} onClose={onClose} isOpen={isOpen}>
				<div className={classes} style={overlayStyle}>
					<Form
						initialValues={initialValues}
						onSubmit={onSubmit}
						{...extraProps}
						render={({ ...formProps }) => (
							<FormModalForm {...formProps} FormComponent={FormComponent} onClose={onCloseHandler} />
						)}
					/>
				</div>
			</Overlay>
		)
	);
};

export default FormModal;
