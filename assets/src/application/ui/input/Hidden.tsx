import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Hidden: React.FC<Props> = (props) => {
	return <input {...props} type='hidden' />;
};

export default Hidden;
