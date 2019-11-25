import { Field } from 'react-final-form';
import { H2, H4, Checkbox } from '@blueprintjs/core/lib/esm';

const hdrStyle = {
	margin: '1em 0 .5em 24%'
};

const lblStyle = {
	boxSizing: 'border-box',
	color: 'grey',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '80px',
	paddingRight: '1em',
	textAlign: 'right',
	verticalAlign: 'top',
	width: '24%'
};

const inputStyle = {
	boxSizing: 'border-box',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '200px',
	width: '60%'
};

const divStyle = {
	boxSizing: 'border-box',
	display: 'block',
	margin: '0 0 1em',
	width: '100%'
};

const datesStyle = {
	boxSizing: 'border-box',
	display: 'inline-block',
	marginLeft: '24%',
	padding: '.5em 0 1em',
	width: '60%'
};

const NewTicketForm = ({ datetimes }) => {
	return (
		<>
			<H2 style={hdrStyle}>New Ticket Details</H2>
			<div style={divStyle}>
				<label style={lblStyle}>Name</label>
				<Field
					name="name"
					component="input"
					type="text"
					placeholder="Name"
					style={inputStyle}
				/>
			</div>
			<div style={divStyle}>
				<label style={lblStyle}>Description</label>
				<Field
					name="description"
					component="input"
					type="text"
					placeholder="description"
					style={inputStyle}
				/>
			</div>
			<div style={divStyle}>
				<label style={lblStyle}>Price</label>
				<Field
					name="price"
					component="input"
					type="text"
					placeholder="ticket price"
					style={inputStyle}
				/>
			</div>
			<H4 style={{ margin: '1.5em 0 0 24%' }}>Date Assignments</H4>
			<div style={divStyle}>
				<div style={datesStyle}>
					{datetimes.map(({ id, name }) => {
						return (
							<Field
								key={id}
								name="datetimes"
								type="checkbox"
								value={id}
								render={({ input, ...rest }) => {
									return (
										<Checkbox
											label={name}
											inline
											{...input}
											{...rest}
										/>
									);
								}}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default NewTicketForm;
