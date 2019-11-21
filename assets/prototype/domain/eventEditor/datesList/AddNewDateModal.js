import classNames from 'classnames';
import { Button, Classes, Overlay } from '@blueprintjs/core/lib/esm';
import { Form, Field } from 'react-final-form';
import useCreateDateMutation from '../containers/mutations/useCreateDateMutation';

const AddNewDateModal = ({ eventId, handleClose, isOpen }) => {
	const [createDate, { data }] = useCreateDateMutation();

	const onSubmit = async ({ description, name }) => {
		const variables = {
			input: { clientMutationId: 'xyz', description, name, eventId }
		};

		createDate({ variables });
	};

	const overlayProps = {
		autoFocus: true,
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		hasBackdrop: true,
		usePortal: true,
		useTallContent: false
	};

	const classes = classNames(
		Classes.CARD,
		Classes.ELEVATION_4,
		'docs-overlay-example-transition',
		'docs-overlay-example-tall'
	);

	const overlayStyle = {
		top: '0',
		left: 'calc(50vw - 200px)',
		margin: '10vh 0',
		width: '400px'
	};

	return (
		<Overlay
			{...overlayProps}
			className={Classes.OVERLAY_SCROLL_CONTAINER}
			onClose={handleClose}
			isOpen={isOpen}
		>
			<div className={classes} style={overlayStyle}>
				<Form
					onSubmit={onSubmit}
					initialValues={{ name: 'test' }}
					render={({
						handleSubmit,
						form,
						submitting,
						pristine,
						values
					}) => (
						<form onSubmit={handleSubmit}>
							<div>
								<label>Name</label>
								<Field
									name="name"
									component="input"
									type="text"
									placeholder="Name"
								/>
							</div>

							<div>
								<label>Description</label>
								<Field
									name="description"
									component="input"
									type="text"
									placeholder="description"
								/>
							</div>

							<div className="buttons">
								<Button
									type="submit"
									disabled={submitting || pristine}
									intent={'primary'}
								>
									Submit
								</Button>
							</div>
						</form>
					)}
				/>
			</div>
		</Overlay>
	);
};

export default AddNewDateModal;
