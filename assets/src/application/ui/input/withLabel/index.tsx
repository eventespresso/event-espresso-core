import React from 'react';

interface Props {
	id?: string;
	label?: string;
}

const withLabel = (output: React.ReactNode): React.FC<Props> => {
	const Component: React.FC<Props> = ({ id, label }) => {
		return (
			<div className={'ee-with-label'}>
				{label && (
					<label className='ee-with-label__input-label' htmlFor={id}>
						{label}
					</label>
				)}
				{output}
			</div>
		);
	};

	return Component;
};

export default withLabel;
