import classNames from 'classnames';
import { Form } from 'react-final-form';
import { Classes, Overlay } from '@blueprintjs/core/lib/esm';
import FormModalForm from './FormModalForm';

const FormModal = ({ FormComponent, initialValues, onSubmit, onClose, isOpen, ...extraProps }) => {
	console.log('%c FormModal', 'color: #1BE7FF;');
	console.log('%c > initialValues: ', 'color: #BCBDAC;', initialValues);

	const overlayProps = {
		autoFocus: true,
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		hasBackdrop: true,
		usePortal: true,
		useTallContent: false,
	};

	const classes = classNames(Classes.CARD, Classes.ELEVATION_4);

	const overlayStyle = {
		boxSizing: 'border-box',
		maxHeight: '90%',
		maxWidth: '900px',
		minHeight: '50%',
		minWidth: '320px',
		width: '80%',
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	};

	return (
		<Overlay {...overlayProps} className={Classes.OVERLAY_SCROLL_CONTAINER} onClose={onClose} isOpen={isOpen}>
			<div className={classes} style={overlayStyle}>
				<Form
					FormComponent={FormComponent}
					initialValues={initialValues}
					onSubmit={onSubmit}
					onClose={onClose}
					{...extraProps}
					render={({ ...formProps }) => <FormModalForm {...formProps} />}
				/>
			</div>
		</Overlay>
	);
};

export default FormModal;
