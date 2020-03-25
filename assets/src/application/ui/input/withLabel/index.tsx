import React from 'react';

interface Props {
	id?: string;
	label?: string;
}

const withLabel = (Component: JSX.Element) => ({ id, label }: Props): JSX.Element => {
	return (
		<div className={'ee-base-input'}>
			{label && (
				<label className='ee-base-input-label' htmlFor={id}>
					{label}
				</label>
			)}
			{Component}
		</div>
	);
};

export default withLabel;
