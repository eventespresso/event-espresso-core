import { Field } from 'react-final-form';

const lblStyle = {
	color: 'grey',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '32px',
	paddingRight: '1em',
	textAlign: 'right',
	width: '100px',
};

const NewDateForm = () => {
	return (
		<>
			<div>
				<label style={ lblStyle } >Name</label>
				<Field
					name="name"
					component="input"
					type="text"
					placeholder="Name"
				/>
			</div>

			<div>
				<label style={ lblStyle }>Description</label>
				<Field
					name="description"
					component="input"
					type="text"
					placeholder="description"
				/>
			</div>
		</>
	);
};

export default NewDateForm;
