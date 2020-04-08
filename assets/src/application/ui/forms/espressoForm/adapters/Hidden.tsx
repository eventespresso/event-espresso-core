import React from 'react';

const Hidden = ({ input, ...rest }) => {
	return <input {...input} {...rest} type='hidden' />;
};

export default Hidden;
